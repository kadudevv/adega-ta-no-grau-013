import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { companyData } from '@/data/company';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-graphite-900/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          <a
            href="#inicio"
            className="flex items-center gap-2.5 group"
            onClick={handleNavClick}
            aria-label={`${companyData.name} - Início`}
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-graphite-950 border border-brand-400/30 group-hover:border-brand-400/70 transition-colors duration-300 overflow-hidden">
              <img src="/image.png" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-tight whitespace-nowrap">
              <span className="sm:hidden">{companyData.shortName}</span>
              <span className="hidden sm:inline">{companyData.name}</span>
            </span>
          </a>

          <ul className="hidden xl:flex items-center gap-1">
            {companyData.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-brand-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <a
              href={companyData.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
            >
              WhatsApp
            </a>
          </div>

          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="adega-mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[41] xl:hidden bg-graphite-950/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="adega-mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed top-0 right-0 bottom-0 z-[42] xl:hidden w-[280px] max-w-[80vw] bg-graphite-800 border-l border-white/10 transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {companyData.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-brand-400 hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-white/10">
            <a
              href={companyData.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={handleNavClick}
              className="btn-primary w-full"
            >
              Falar no WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-gray-400">
              {companyData.phone.display}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
