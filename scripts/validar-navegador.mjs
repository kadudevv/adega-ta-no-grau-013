import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as pause } from 'node:timers/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173/';
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  stdio: 'ignore',
});
let browser;
const checks = [];
function ok(label) {
  console.log('OK:', label);
  checks.push(label);
}

try {
  let isReady = false;
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(base);
      if (response.ok) {
        isReady = true;
        break;
      }
    } catch { /* Vite ainda iniciando */ }
    await pause(250);
  }
  assert.ok(isReady, 'Servidor da prévia não iniciou');

  browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('h1').waitFor({ state: 'visible' });
  assert.match(await page.locator('h1').innerText(), /Tá no Grau/);
  ok('Página carrega e exibe o título');

  const red = page.getByRole('link', { name: 'Pedir no iFood' });
  const ifood = await red.getAttribute('href');
  assert.ok(ifood?.startsWith('https://www.ifood.com.br/delivery/praia-grande-sp/adega-ta-no-grau-013-aviacao/'));
  assert.equal(await red.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(234, 29, 44)');
  ok('Botão vermelho do iFood e endereço da loja');

  const wa = await page.getByRole('link', { name: 'Falar no WhatsApp', exact: true }).first().getAttribute('href');
  assert.ok(wa?.startsWith('https://wa.me/5513996158547'));
  const maps = await page.getByRole('link', { name: 'Como chegar' }).getAttribute('href');
  assert.ok(maps?.startsWith('https://www.google.com/maps/dir/'));
  assert.equal(await page.getByRole('link', { name: /telefone/i }).count(), 1);
  ok('WhatsApp, GPS e telefone configurados');

  const brokenIds = await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')).filter(
    href => href && href.length > 1 && !document.getElementById(decodeURIComponent(href.substring(1)))
  ));
  assert.deepEqual(brokenIds, []);
  ok('Todas as âncoras internas têm seção de destino');

  const photos = page.locator('img[src^="/fotos-vitrine/"]');
  assert.equal(await photos.count(), 4);
  for (let i = 0; i < 4; i += 1) {
    const photo = photos.nth(i);
    await photo.scrollIntoViewIfNeeded();
    const src = await photo.getAttribute('src');
    await page.waitForFunction(s => {
      const img = document.querySelector('img[src="' + s + '"]');
      return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
    }, src, { timeout: 15000 });
  }
  ok('Quatro fotos reais carregam sem erro');

  const banner = page.locator('aside[aria-label="Aviso de privacidade"]');
  await banner.waitFor({ state: 'visible' });
  assert.equal(await page.locator('iframe').count(), 0, 'Mapa não pode carregar antes da permissão');
  await page.getByRole('button', { name: 'Só o necessário' }).click();
  assert.equal(await banner.count(), 0);
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await banner.count(), 0, 'Escolha deve persistir após atualizar');
  assert.equal(await page.locator('iframe').count(), 0);
  ok('Consentimento mínimo é salvo e bloqueia o mapa');

  await page.getByRole('button', { name: 'Carregar mapa do Google' }).click();
  assert.equal(await page.locator('iframe').count(), 1);
  await page.getByRole('button', { name: 'Preferências de cookies' }).click();
  const toggle = page.getByRole('checkbox', { name: 'Permitir mapa do Google' });
  assert.equal(await toggle.isChecked(), true);
  await toggle.uncheck();
  await page.getByRole('button', { name: 'Salvar preferências' }).click();
  assert.equal(await page.locator('iframe').count(), 0);
  ok('Autorizar e revogar consentimento funciona');

  await page.getByRole('button', { name: 'Política de privacidade' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible' });
  assert.ok((await dialog.innerText()).includes('LGPD'));
  const focusedClose = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  assert.equal(focusedClose, 'Fechar janela de privacidade');
  await page.keyboard.press('Shift+Tab');
  assert.equal(await dialog.evaluate(el => el.contains(document.activeElement)), true);
  await page.keyboard.press('Escape');
  assert.equal(await dialog.count(), 0);
  ok('Política abre, prende foco no teclado e fecha com Escape');

  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const drawer = page.locator('#adega-mobile-menu');
  assert.equal(await drawer.getAttribute('aria-hidden'), 'false');
  await drawer.getByRole('link', { name: 'Produtos' }).click();
  assert.equal(await drawer.getAttribute('aria-hidden'), 'true');
  assert.equal(new URL(page.url()).hash, '#produtos');
  ok('Menu mobile abre, navega e fecha');

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth,
    }));
    assert.ok(scrollWidth <= innerWidth + 2, 'Rolagem horizontal em ' + width + 'px (' + scrollWidth + ' > ' + innerWidth + ')');
  }
  ok('Sem rolagem horizontal em cinco tamanhos de tela');
  assert.deepEqual(errors, [], 'Erros de JavaScript: ' + errors.join('; '));
  ok('Sem erros de JavaScript durante os testes');
  console.log('PASSOU:', checks.length, 'verificações automatizadas');
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
