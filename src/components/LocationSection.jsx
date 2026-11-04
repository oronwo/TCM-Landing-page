import Icon from './Icon.jsx';
import { address, mapEmbedUrl, mapsUrl } from '../data/site.js';

// Endereço confirmado, mapa incorporado e link para abrir a localização no Google Maps.
export default function LocationSection() {
  return <section className="location-section section-pad" id="localizacao"><div className="wrap location-layout">
    <div className="reveal"><p className="eyebrow dark"><span/> COMO CHEGAR <span/></p><h2>Estamos<br/><em>perto de você.</em></h2><p className="location-address"><Icon name="pin"/>{address}</p><a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <Icon name="arrow"/></a></div>
    <div className="map-card reveal reveal-delay-1"><iframe title="Mapa da TCM Auto Center no Google Maps" src={mapEmbedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/><a className="map-open" href={mapsUrl} target="_blank" rel="noreferrer">Ver rota <Icon name="arrow"/></a></div>
  </div></section>;
}
