import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { servicePhotos, services } from '../data/site.js';

// Slide de fotos com troca automática, indicadores, teclado e suporte a movimento reduzido.
function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % servicePhotos.length), 5000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const go = delta => setActive(index => (index + delta + servicePhotos.length) % servicePhotos.length);

  return <div className="carousel" aria-roledescription="carrossel" aria-label="Imagens da TCM Auto Center" tabIndex="0" onKeyDown={event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
  }}>
    {servicePhotos.map((photo, index) => <img key={photo.src} className={`carousel-image ${index === active ? 'is-active' : ''}`} src={photo.src} alt={photo.alt} aria-hidden={index !== active} />)}
    <div className="carousel-gradient"/>
    <div className="carousel-dots" aria-label="Selecionar imagem">{servicePhotos.map((photo, index) => <button key={photo.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Exibir imagem ${index + 1}`} aria-current={index === active ? 'true' : undefined}/>)}</div>
  </div>;
}

// Seção com apresentação curta, serviços, horário e fotos da oficina.
export default function ServicesSection() {
  return <section className="services-section section-pad" id="servicos"><div className="wrap service-layout">
    <div className="service-copy reveal"><p className="eyebrow dark"><span/> CUIDADO AUTOMOTIVO <span/></p><h2>Prontos para<br/>cuidar do seu <em>carro.</em></h2>
      <p className="intro">A TCM Auto Center está em Morada de Laranjeiras, Serra. Entre em contato para agendar seu atendimento.</p>
      <h3>Serviços</h3><ul className="service-list">{services.map((service, index) => <li key={service}><span className="service-index">{String(index + 1).padStart(2, '0')}</span>{service}<span className="service-mark">+</span></li>)}</ul>
      <div className="hours"><Icon name="clock"/><div><b>Horário de funcionamento</b><span>Segunda a sexta, das 08h às 18h</span></div></div>
    </div><div className="service-visual reveal reveal-delay-1"><PhotoCarousel/><p className="visual-note">Cuidado em cada detalhe<span>— TCM Auto Center</span></p></div>
  </div></section>;
}
