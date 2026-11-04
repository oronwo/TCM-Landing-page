import Icon from './Icon.jsx';
import { address, mapsUrl, phone, publicAsset } from '../data/site.js';

// Abertura do site com foto da fachada, chamada principal e contatos da loja.
export default function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <img className="hero-image" src={publicAsset('images/fachada.png')} alt="Fachada da TCM Auto Center" />
    <div className="hero-shade"/><div className="hero-content wrap reveal">
      <p className="eyebrow"><span/> CENTRO AUTOMOTIVO <span/></p>
      <h1 id="hero-title">TCM Auto<br/><em>Center</em></h1>
      <p className="hero-copy">Seu carro em boas mãos.</p>
      <div className="hero-actions"><a className="button button-red button-large" href={`tel:${phone}`}><Icon name="phone"/>Agende seu atendimento <Icon name="arrow"/></a><a className="hero-phone" href={`tel:${phone}`}>(27) 3051-2181</a></div>
      <a className="hero-address" href={mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin"/><span>{address}</span></a>
    </div><a className="scroll-cue" href="#servicos" aria-label="Ir para serviços"><span/></a>
  </section>;
}
