import Icon from './Icon.jsx';
import { address, mapsUrl, phone } from '../data/site.js';

// Rodapé com endereço, horário, telefone e links sociais fornecidos pela loja.
export default function Footer() {
  return <footer className="footer"><div className="wrap footer-main">
    <a className="footer-brand" href="#inicio"><img src="/images/logo.png" alt="TCM Auto Center"/></a>
    <div className="footer-address reveal"><b>Visite a TCM</b><a href={mapsUrl} target="_blank" rel="noreferrer">{address}</a><span>Segunda a sexta · 08h às 18h</span></div>
    <div className="footer-contact reveal reveal-delay-1"><b>Fale com a gente</b><a href={`tel:${phone}`}><Icon name="phone"/>(27) 3051-2181</a>
      <div className="social-links" aria-label="Redes sociais e WhatsApp"><a className="instagram-link" href="https://www.instagram.com/tcmautocenter1/" target="_blank" rel="noreferrer" aria-label="Instagram da TCM Auto Center"><img src="/images/instagram-icon.png" alt="" aria-hidden="true"/></a><a className="whatsapp-link" href="https://wa.me/552730512181" target="_blank" rel="noreferrer" aria-label="WhatsApp da TCM Auto Center"><img src="/images/whatsapp-icon.png" alt="" aria-hidden="true"/></a></div>
    </div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} TCM Auto Center. Todos os direitos reservados.</span><a href="#inicio">Voltar ao início ↑</a></div></footer>;
}
