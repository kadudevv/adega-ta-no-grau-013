import { Wine, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { companyData } from '@/data/company';
import { usePrivacy } from '@/contexts/PrivacyContext';

export default function Footer() {
  const { openPrivacy } = usePrivacy();
  const currentYear = new Date().getFullYear();
  const { address, phone, navLinks, legalNotice, name } = companyData;

  return (
    <footer className="relative border-t border-white/5 bg-graphite-950">
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-400/10 border border-brand-400/20">
                <Wine className="w-5 h-5 text-brand-400" />
              </div>
              <span className="font-display font-bold text-base">
                {name}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {companyData.segment}. {address.district}, {address.city} – {address.state}.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>
                  {address.full}<br />
                  {address.district}, {address.city} – {address.state}<br />
                  CEP {address.cep}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a
                  href={`tel:+55${phone.raw}`}
                  className="hover:text-brand-400 transition-colors"
                >
                  {phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex items-start gap-2.5 mb-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200/80">{legalNotice}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {name}. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
              <button type="button" onClick={() => openPrivacy('policy')} className="hover:text-brand-400 focus-visible:underline">Política de privacidade</button>
              <button type="button" onClick={() => openPrivacy('cookies')} className="hover:text-brand-400 focus-visible:underline">Preferências de cookies</button>
              <button type="button" onClick={() => openPrivacy('terms')} className="hover:text-brand-400 focus-visible:underline">Termos de uso</button>
              <span>Praia Grande – SP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
