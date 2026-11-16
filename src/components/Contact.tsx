import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { phone, address, whatsapp, hours } = companyData;
  const todayKey = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: hours.timezone }).format(new Date());

  return (
    <section id="contato" className="section-padding relative">
      <div className="container-custom">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Contato"
            title="Fale com a gente"
            description="Entre em contato para informações, dúvidas ou atendimentos."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a
              href={`tel:+55${phone.raw}`}
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <Phone className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Telefone
              </h3>
              <p className="text-lg font-medium text-white">{phone.display}</p>
            </a>

            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                WhatsApp
              </h3>
              <p className="text-lg font-medium text-white">
                Falar agora
              </p>
            </a>

            <a
              href={companyData.maps.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <MapPin className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Endereço
              </h3>
              <p className="text-base font-medium text-white leading-snug">
                {address.full}<br />
                {address.district}, {address.city} – {address.state}
              </p>
            </a>

            <a href="#horarios" className="card-surface card-hover p-6 group block">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <Clock className="w-6 h-6 text-brand-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Horários
              </h3>
              <p className="text-base font-medium text-white leading-snug">
                Ver horários da semana
              </p>
              <span className="mt-2 inline-block text-sm font-medium text-brand-400">Conferir funcionamento</span>
            </a>
          </div>

          <div id="horarios" className="mx-auto mt-12 max-w-5xl scroll-mt-28">
            <div className="card-surface overflow-hidden">
              <div className="flex flex-col gap-2 border-b border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-brand-400" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Horário de funcionamento</h3>
                </div>
                <p className="text-sm text-gray-400">Confira nossos horários de atendimento por dia da semana.</p>
              </div>

              <ul className="space-y-1 p-3 sm:p-5" aria-label="Horários da semana">
                {hours.weekly.map((day) => {
                  const isToday = day.key === todayKey;
                  return (
                    <li key={day.key} className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl px-4 py-3 sm:px-5 ${isToday ? 'border border-brand-400/30 bg-brand-400/10' : 'border border-transparent'}`}>
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${isToday ? 'bg-brand-400' : 'bg-gray-600'}`} />
                        <span className={`font-medium ${isToday ? 'text-white' : 'text-gray-300'}`}>{day.label}</span>
                        {isToday && <span className="rounded-full bg-brand-400 px-2 py-0.5 text-xs font-bold text-graphite-950">Hoje</span>}
                      </div>
                      <span className={`font-semibold tabular-nums ${isToday ? 'text-brand-400' : 'text-white'}`}>
                        {day.start}–{day.end}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-white/10 px-6 py-5 sm:px-8">
                <p className="text-sm leading-relaxed text-gray-400">
                  {hours.specialNotice} Nas sextas e sábados, 00:00 significa meia-noite do dia seguinte.
                </p>
                <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:underline">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Confirmar horário pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
