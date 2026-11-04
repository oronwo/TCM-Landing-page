import { useState } from 'react';
import Icon from './Icon.jsx';
import { mapsUrl, phone, publicAsset } from '../data/site.js';

// Cabeçalho com navegação responsiva, localização e acesso rápido ao telefone.
export default function Header() {
  const [open, setOpen] = useState(false);

  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="TCM Auto Center, início"><img src={publicAsset('images/logo.png')} alt="TCM Auto Center" /></a>
    <button className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
      <a href="#inicio" onClick={() => setOpen(false)}>Início</a><a href="#servicos" onClick={() => setOpen(false)}>Serviços</a><a href="#avaliacoes" onClick={() => setOpen(false)}>Avaliações</a>
    </nav>
    <a className="header-location" href={mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin"/><span>Serra <b>·</b> ES</span></a>
    <a className="button button-red header-cta" href={`tel:${phone}`}><Icon name="phone"/>Ligue para nós</a>
  </header>;
}
