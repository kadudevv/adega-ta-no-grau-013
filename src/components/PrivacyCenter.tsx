import { useEffect, useRef, useState } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { companyData } from '@/data/company';
import { usePrivacy } from '@/contexts/PrivacyContext';

export default function PrivacyCenter() {
  const { choice, view, openPrivacy, closePrivacy, saveChoice } = usePrivacy();
  const [allowMaps, setAllowMaps] = useState(choice.allowGoogleMaps);
  const dialogRef = useRef<HTMLElement>(null);
  const isOpen = view !== null;
  useEffect(() => { setAllowMaps(choice.allowGoogleMaps); }, [choice.allowGoogleMaps, view]);
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!view) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePrivacy();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      ) ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, closePrivacy]);

  return (
    <>
      {!choice.decided && (
        <aside aria-label="Aviso de privacidade" className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-4xl rounded-2xl border border-brand-400/40 bg-graphite-950 p-5 shadow-2xl shadow-black/60 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" aria-hidden="true" />
              <div>
                <p className="font-display font-bold text-white">Privacidade e cookies</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-300">Guardamos sua escolha de privacidade neste navegador. O mapa do Google só é carregado com sua autorização.</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" onClick={() => openPrivacy('cookies')} className="btn-secondary px-4 py-2 text-sm">Personalizar</button>
              <button type="button" onClick={() => saveChoice(false)} className="btn-primary px-4 py-2 text-sm">Só o necessário</button>
            </div>
          </div>
        </aside>
      )}
      {view && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 sm:p-6" onMouseDown={event => { if (event.target === event.currentTarget) closePrivacy(); }}>
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="privacy-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-graphite-900 p-5 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-brand-400" aria-hidden="true" />
                <h2 id="privacy-title" className="font-display text-xl font-bold text-white sm:text-2xl">{view === 'terms' ? 'Termos de uso' : 'Privacidade e cookies'}</h2>
              </div>
              <button type="button" onClick={closePrivacy} className="rounded-lg p-2 text-gray-300 hover:bg-white/10" aria-label="Fechar janela de privacidade"><X className="h-5 w-5" /></button>
            </div>
            <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <button type="button" onClick={() => openPrivacy('policy')} className={'rounded-lg px-4 py-2 text-sm font-semibold ' + (view === 'policy' ? 'bg-brand-400 text-graphite-950' : 'bg-white/5 text-gray-200 hover:bg-white/10')}>Política de privacidade</button>
              <button type="button" onClick={() => openPrivacy('cookies')} className={'rounded-lg px-4 py-2 text-sm font-semibold ' + (view === 'cookies' ? 'bg-brand-400 text-graphite-950' : 'bg-white/5 text-gray-200 hover:bg-white/10')}>Preferências de cookies</button>
              <button type="button" onClick={() => openPrivacy('terms')} className={'rounded-lg px-4 py-2 text-sm font-semibold ' + (view === 'terms' ? 'bg-brand-400 text-graphite-950' : 'bg-white/5 text-gray-200 hover:bg-white/10')}>Termos de uso</button>
            </div>
            {view === 'policy' ? (
              <div className="space-y-5 text-sm leading-7 text-gray-300">
                <p>Esta política descreve o funcionamento do site institucional da <strong className="text-white">{companyData.name}</strong>, localizada em {companyData.address.full}, {companyData.address.city} – {companyData.address.state}, CNPJ {companyData.cnpj}. Última atualização: 16/11/2026.</p>
                <div><h3 className="mb-1 font-semibold text-white">Dados e finalidades</h3><p>Este site não possui formulário de cadastro nem processa pagamentos. A hospedagem no Render pode processar dados técnicos, como endereço IP, navegador e informações de requisições, para funcionamento, prevenção de abusos e segurança. Ao utilizar WhatsApp, telefone, rotas ou iFood, você passa a interagir com os respectivos serviços.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Terceiros</h3><p>O mapa incorporado do Google só é carregado depois de sua autorização. Links externos para WhatsApp, iFood e Google Maps direcionam a plataformas com políticas próprias. As fontes do Google Fonts também podem ser solicitadas pelo navegador para apresentar este site.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Armazenamento local e cookies</h3><p>A preferência sobre o mapa é salva no armazenamento local (localStorage) do navegador, não em um banco de dados da adega. O mapa incorporado pode usar cookies ou tecnologias semelhantes depois de autorizado. O site não implementa ferramentas próprias de publicidade comportamental ou analytics. Você pode alterar a escolha a qualquer momento pelo rodapé.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Seus direitos e contato</h3><p>Você pode pedir informações sobre tratamentos de dados sob responsabilidade da adega e, quando aplicável, exercer direitos previstos na LGPD, como confirmação, acesso, correção ou exclusão. Entre em contato pelo telefone {companyData.phone.display}. Serviços externos possuem seus próprios canais de privacidade. O visitante também pode solicitar informações sobre o uso de seus dados pelo contato informado.</p></div>
              </div>
            ) : view === 'terms' ? (
              <div className="space-y-5 text-sm leading-7 text-gray-300">
                <p>Estes termos explicam o uso do site informativo da <strong className="text-white">{companyData.name}</strong>, em Praia Grande – SP. Última atualização: 16/11/2026.</p>
                <div><h3 className="mb-1 font-semibold text-white">Finalidade do site</h3><p>Aqui você encontra informações gerais sobre a adega, fotos do estabelecimento, localização e formas de contato. Este site não possui cadastro, carrinho nem sistema próprio de pagamento.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Produtos, preços e disponibilidade</h3><p>As imagens são uma apresentação do espaço, não um catálogo atualizado em tempo real. Produtos, estoque, preços, horários e condições de atendimento podem mudar. Confirme as informações diretamente com o estabelecimento ou no serviço escolhido para o pedido.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Pedidos, cancelamentos e reembolsos</h3><p>O botão do iFood abre uma plataforma externa. Para compras feitas por ela, consulte as condições de pagamento, entrega, cancelamento e reembolso apresentadas no próprio iFood. Este site não processa nem reembolsa pedidos diretamente. Para questões sobre atendimento presencial, entre em contato com a adega.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Links e conteúdo</h3><p>WhatsApp, iFood e Google Maps possuem termos e políticas próprios. Fotografias, logotipos e outras marcas podem ter titulares de direitos distintos; o acesso a este site não autoriza sua reprodução sem a permissão aplicável.</p></div>
                <div><h3 className="mb-1 font-semibold text-white">Contato</h3><p>Para dúvidas sobre as informações desta página, fale com a adega pelo telefone {companyData.phone.display}.</p></div>
              </div>
            ) : (
              <div className="space-y-5 text-sm leading-7 text-gray-300">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">Armazenamento necessário</p><p>Usado para guardar sua escolha sobre o mapa neste navegador. Sempre ativo quando permitido pelo navegador.</p></div>
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span><span className="block font-semibold text-white">Carregar mapa incorporado do Google</span><span className="block text-gray-300">Ao permitir, o Google pode receber informações técnicas da visita. Desative para usar apenas o link externo de rotas.</span></span>
                  <input type="checkbox" checked={allowMaps} onChange={event => setAllowMaps(event.target.checked)} className="mt-2 h-5 w-5 shrink-0 accent-yellow-400" aria-label="Permitir mapa do Google" />
                </label>
                <button type="button" onClick={() => { saveChoice(allowMaps); closePrivacy(); }} className="btn-primary w-full">Salvar preferências</button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
