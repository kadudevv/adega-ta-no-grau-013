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

  const navLogo = page.locator('nav img[src="/image.png"]');
  assert.equal(await navLogo.count(), 1, 'A logo original deve continuar no menu');
  assert.equal(await navLogo.evaluate(img => img.complete && img.naturalWidth > 0), true);
  assert.equal(await navLogo.evaluate(img => getComputedStyle(img).objectFit), 'contain');
  await page.setViewportSize({ width: 1440, height: 900 });
  const logoDimensions = await navLogo.boundingBox();
  console.log('Debug logo desktop:', JSON.stringify({
    width: logoDimensions?.width,
    className: await navLogo.getAttribute('class'),
    parentClass: await navLogo.evaluate(el => el.parentElement?.className),
    parentWidth: await navLogo.evaluate(el => el.parentElement?.getBoundingClientRect().width),
    viewport: await page.evaluate(() => window.innerWidth)
  }));
  assert.ok(logoDimensions && logoDimensions.width >= 56, 'Logo do menu deve estar maior no desktop');
  const watermark = page.locator('img.logo-watermark');
  const watermarkPosition = await watermark.evaluate(img => ({
    right: parseFloat(getComputedStyle(img).right),
    sectionWidth: img.closest('section')?.getBoundingClientRect().width || 0,
  }));
  assert.ok(Math.abs(watermarkPosition.right + watermarkPosition.sectionWidth * 0.04) < 2, 'Logo do fundo deve estar deslocada para a esquerda (right: -4%)');
  await page.setViewportSize({ width: 390, height: 844 });
  ok('Logo maior e melhor contrastada; marca d’água reposicionada');

  const red = page.getByRole('link', { name: 'Pedir no iFood' });
  const ifood = await red.getAttribute('href');
  assert.ok(ifood?.startsWith('https://www.ifood.com.br/delivery/praia-grande-sp/adega-ta-no-grau-013-aviacao/'));
  assert.equal(await red.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(234, 29, 44)');
  ok('Botão vermelho do iFood e endereço da loja');

  const wa = await page.getByRole('link', { name: 'Falar no WhatsApp', exact: true }).first().getAttribute('href');
  assert.ok(wa?.startsWith('https://wa.me/5513996158547'));
  const maps = await page.getByRole('link', { name: 'Como chegar' }).getAttribute('href');
  assert.ok(maps?.startsWith('https://www.google.com/maps/dir/'));
  const phoneLinks = await page.locator('a[href^="tel:"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
  assert.ok(phoneLinks.length >= 2, 'O telefone deve aparecer na seção contato e no rodapé');
  assert.ok(phoneLinks.every(href => href === 'tel:+5513996158547'), 'Todos os links de telefone devem usar o DDI +55');
  ok('WhatsApp, GPS e links de telefone com DDI brasileiro');
  assert.equal(await page.getByText('CNPJ: 68.689.649/0001-03').count(), 1, 'CNPJ deve aparecer no rodapé');
  ok('CNPJ da adega exibido no rodapé');

  const weekly = page.locator('#horarios li');
  assert.equal(await weekly.count(), 7, 'Deve haver os sete horários semanais');
  const days = await weekly.allInnerTexts();
  assert.match(days[0], /Segunda-feira[\s\S]*09:00–22:00/);
  assert.match(days[4], /Sexta-feira[\s\S]*09:00–00:00/);
  assert.match(days[5], /Sábado[\s\S]*09:00–00:00/);
  assert.match(days[6], /Domingo[\s\S]*09:00–22:00/);
  assert.equal(await page.locator('#horarios li').filter({ hasText: 'Hoje' }).count(), 1);
  ok('Sete horários publicados corretamente, com destaque para o dia atual');

  const reviewButtons = page.getByRole('link', { name: 'Avaliar no Google' });
  assert.equal(await reviewButtons.count(), 1);
  const reviewUrl = await reviewButtons.getAttribute('href');
  assert.ok(reviewUrl?.includes('!12e1'), 'Botão Avaliar deve usar a função Escrever avaliação do Google');
  assert.equal(await reviewButtons.getAttribute('target'), '_blank');
  const readReviewUrl = await page.getByRole('link', { name: 'Ver todas no Google' }).getAttribute('href');
  assert.ok(readReviewUrl?.includes('!9m1!1b1'), 'Botão Ver todas deve usar a aba Avaliações do Google');
  assert.notEqual(readReviewUrl, reviewUrl, 'Links de escrever e ler avaliações não podem ser iguais');
  assert.ok(readReviewUrl?.includes('0x94ce1f005d18a55f:0x53299be2e9ce98cf'));
  assert.ok(reviewUrl?.includes('0x94ce1f005d18a55f:0x53299be2e9ce98cf'));
  const reviewCards = page.locator('#avaliacoes li');
  assert.equal(await reviewCards.count(), 5, 'Exibir exatamente cinco avaliações reais');
  const expectedReviews = [
    ['Rayssa Silva dos santos dantas', 'Que adega ótima!'],
    ['Erick Matos', 'Atendimento muito bom pessoas super educadas'],
    ['Diégo Wendell Américo De Souza', 'Ótimo atendimento e produtos de qualidade'],
    ['Geovane Oliveira', 'Lugar fácil acesso atendimento Toop indico'],
    ['rosana vituri', 'Excelente ADEGA, sou cliente de todos os dias'],
  ];
  for (const [index, [name, excerpt]] of expectedReviews.entries()) {
    const text = await reviewCards.nth(index).innerText();
    assert.ok(text.includes(name), 'Nome correto na avaliação ' + (index + 1));
    assert.ok(text.includes(excerpt), 'Trecho do comentário correto na avaliação ' + (index + 1));
    assert.equal(await reviewCards.nth(index).locator('svg').count(), 5, 'Cinco estrelas na avaliação ' + (index + 1));
  }
  assert.equal(await page.getByText('Os depoimentos em destaque serão adicionados').count(), 0);
  ok('Cinco avaliações reais publicadas nos cards e links do Google preservados');

  assert.equal(await page.getByRole('link', { name: 'Pular para o conteúdo' }).getAttribute('href'), '#conteudo-principal');
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
  await page.getByRole('button', { name: 'Termos de uso' }).click();
  assert.ok((await page.getByRole('dialog').innerText()).includes('cancelamentos e reembolsos'));
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);
  ok('Termos de uso acessíveis e coerentes com pedidos no iFood');

  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const drawer = page.locator('#adega-mobile-menu');
  assert.equal(await drawer.getAttribute('aria-hidden'), 'false');
  const drawerLayer = await drawer.evaluate(el => Number(getComputedStyle(el).zIndex));
  const floatLayer = await page.locator('a[aria-label="Falar no WhatsApp"]').evaluate(el => Number(getComputedStyle(el).zIndex));
  assert.ok(drawerLayer > floatLayer, 'Menu móvel deve ficar acima do WhatsApp flutuante');
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
