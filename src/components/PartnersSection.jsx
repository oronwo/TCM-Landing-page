import { partnerBrands } from '../data/site.js';

// Faixa contínua com as logos de marcas fornecidas pela loja.
export default function PartnersSection() {
  const sequence = [...partnerBrands, ...partnerBrands];
  return <section className="partners-section" aria-label="Marcas parceiras">
    <div className="wrap partners-heading reveal"><p className="eyebrow dark"><span/> MARCAS PARCEIRAS <span/></p></div>
    <div className="marquee"><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>{sequence.map((brand, index) => <div className="brand-tile" key={`${brand.src}-${index}`}><img src={brand.src} alt={copy === 0 ? brand.alt : ''}/></div>)}</div>)}</div></div>
  </section>;
}
