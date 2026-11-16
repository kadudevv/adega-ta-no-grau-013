const url = 'https://adega-ta-no-grau-013.onrender.com/';
try {
  const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Site retornou HTTP ' + response.status);
  console.log('Site publico acessivel por HTTPS:', response.status, response.url);
  const desired = [
    ['x-content-type-options', 'Bloqueio de interpretacao indevida de tipos'],
    ['x-frame-options', 'Protecao contra incorporacao por terceiros'],
    ['referrer-policy', 'Limitacao do referenciador enviado'],
    ['permissions-policy', 'Restricoes a camera, microfone e geolocalizacao'],
    ['strict-transport-security', 'Obrigar HTTPS nas visitas seguintes'],
    ['content-security-policy', 'Politica restritiva de origens (exige ajuste para Google Fonts e Maps)'],
  ];
  for (const [header, explanation] of desired) {
    const value = response.headers.get(header);
    console.log((value ? 'PRESENTE' : 'A CONFIRMAR') + ': ' + header + ' — ' + explanation + (value ? ' = ' + value : ''));
  }
  const assets = [
    'image.png',
    'fotos-vitrine/geladeira-cervejas.jpg',
    'fotos-vitrine/refrigerantes-energeticos.jpg',
    'fotos-vitrine/tabacaria.jpg',
    'fotos-vitrine/gelo-real.jpg',
  ];
  for (const asset of assets) {
    const file = await fetch(url + asset, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    if (!file.ok || !(file.headers.get('content-type') ?? '').startsWith('image/')) {
      throw new Error('Imagem publica indisponivel ou com tipo incorreto: ' + asset + ' (HTTP ' + file.status + ')');
    }
    console.log('IMAGEM OK:', asset, file.status, file.headers.get('content-type'));
  }
  console.log('Obs.: relatorio dos cabeçalhos, não é pentest nem certificação de conformidade.');
} catch (e) {
  console.warn('Não foi possível consultar o domínio público:', e.message);
}
