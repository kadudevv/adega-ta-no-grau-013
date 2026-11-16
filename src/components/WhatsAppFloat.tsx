import { MessageCircle } from 'lucide-react';
import { companyData } from '@/data/company';

export default function WhatsAppFloat() {
  return (
    <a
      href={companyData.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-brand-400 text-graphite-900 shadow-lg shadow-brand-400/30 hover:scale-110 transition-transform duration-300 animate-pulse-glow"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
