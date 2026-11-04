import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import LocationSection from './components/LocationSection.jsx';
import PartnersSection from './components/PartnersSection.jsx';
import Footer from './components/Footer.jsx';
import ScrollReveal from './components/ScrollReveal.jsx';

// Composição principal: mantém a ordem das seções da página institucional.
export default function App() {
  return <><ScrollReveal/><Header/><main><Hero/><ServicesSection/><ReviewsSection/><LocationSection/><PartnersSection/></main><Footer/></>;
}
