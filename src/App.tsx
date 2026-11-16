import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PrivacyCenter from '@/components/PrivacyCenter';
import { PrivacyProvider } from '@/contexts/PrivacyContext';

function App() {
  return (
    <PrivacyProvider>
    <div className="min-h-screen bg-graphite-900 text-white">
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-400 focus:px-4 focus:py-3 focus:font-semibold focus:text-graphite-950">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <PrivacyCenter />
    </div>
    </PrivacyProvider>
  );
}

export default App;
