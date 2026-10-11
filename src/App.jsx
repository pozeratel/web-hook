import { Header, Footer } from "./components/layout/Layout.jsx";
import Hero from "./components/sections/Hero.jsx";
import Benefits from "./components/sections/Benefits.jsx";
import IndustrySolutions from "./components/sections/IndustrySolutions.jsx";
import LaunchSteps from "./components/sections/LaunchSteps.jsx";
import FAQ from "./components/sections/FAQ.jsx";
import CrmDemo from "./components/CrmDemo/CrmDemo.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <CrmDemo />
        <Benefits />
        <IndustrySolutions />
        <LaunchSteps />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
