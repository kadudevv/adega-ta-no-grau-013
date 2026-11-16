import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

function App() {
  return (
    <div className="min-h-screen bg-graphite-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
