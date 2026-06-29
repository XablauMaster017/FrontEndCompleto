import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Reform from '@/components/Reform';
import WhyItMatters from '@/components/WhyItMatters';
import Solution from '@/components/Solution';
import HowItWorks from '@/components/HowItWorks';
import Comparison from '@/components/Comparison';
import Roadmap from '@/components/Roadmap';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Problem />
        <Reform />
        <WhyItMatters />
        <Solution />
        <HowItWorks />
        <Comparison />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
