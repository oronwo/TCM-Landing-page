import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { mapsUrl, referenceReviews } from '../data/site.js';

// Nota e comentários do Google; usa os comentários fornecidos pela loja se a API não entregar texto.
export default function ReviewsSection() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7000);
    fetch(`${import.meta.env.BASE_URL}api/reviews`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Reviews API unavailable');
        return response.json();
      })
      .then(result => {
        if (!result.rating) throw new Error('Google rating unavailable');
        setData(result);
        setState('ready');
      })
      .catch(() => setState('fallback'))
      .finally(() => window.clearTimeout(timeout));
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  const liveReviews = state === 'ready' && data?.reviews?.length
    ? data.reviews
      .map(review => ({
        ...review,
        cleanText: review.text?.text || (typeof review.text === 'string' ? review.text : '') || review.originalText?.text || ''
      }))
      .filter(review => review.cleanText.trim())
      .slice(0, 5)
      .map(review => ({
        name: review.authorAttribution?.displayName || 'Usuário do Google',
        age: review.relativePublishTimeDescription || '',
        rating: review.rating || 0,
        text: review.cleanText,
        href: review.authorAttribution?.uri || data.googleMapsUri || mapsUrl
      }))
    : [];

  const showingGoogleComments = liveReviews.length > 0;
  const slides = state === 'loading'
    ? [{ name: '', age: '', text: 'Consultando as avaliações do Google…', rating: 0, href: '#' }]
    : showingGoogleComments
      ? liveReviews
      : referenceReviews.map(review => ({ ...review, rating: 5, href: mapsUrl }));

  const getCardStep = () => {
    const card = trackRef.current?.querySelector('.review-card');
    if (!card) return 0;
    const trackStyle = window.getComputedStyle(trackRef.current);
    return card.getBoundingClientRect().width + Number.parseFloat(trackStyle.columnGap || trackStyle.gap || '0');
  };

  const scrollToIndex = index => {
    const step = getCardStep();
    if (!step || !carouselRef.current) return;
    carouselRef.current.scrollTo({ left: index * step, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const nextReview = () => {
    const step = getCardStep();
    const viewport = carouselRef.current;
    if (!step || !viewport) return;
    if (activeIndex >= slides.length - 1) {
      viewport.scrollTo({ left: slides.length * step, behavior: reducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => viewport.scrollTo({ left: 0, behavior: 'auto' }), reducedMotion ? 0 : 650);
    } else {
      viewport.scrollBy({ left: step, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const previousReview = () => {
    const step = getCardStep();
    const viewport = carouselRef.current;
    if (!step || !viewport) return;
    if (activeIndex <= 0) {
      viewport.scrollTo({ left: slides.length * step, behavior: 'auto' });
      window.requestAnimationFrame(() => viewport.scrollBy({ left: -step, behavior: reducedMotion ? 'auto' : 'smooth' }));
    } else {
      viewport.scrollBy({ left: -step, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Avança os cartões em loop; desativa o autoplay para quem prefere movimento reduzido.
  useEffect(() => {
    if (state === 'loading' || slides.length < 2 || reducedMotion) return;
    const timer = window.setInterval(nextReview, 5200);
    return () => window.clearInterval(timer);
  }, [state, slides.length, reducedMotion, activeIndex]);

  return <section className="reviews-section section-pad" id="avaliacoes"><div className="wrap reviews-inner">
    <div className="reviews-summary reveal"><p className="eyebrow"><span/> QUEM CONHECE, CONFIA <span/></p><h2>Avaliações</h2><p className="reviews-lead">A opinião de quem já passou por aqui.</p>
      {state === 'ready' && data?.rating
        ? <div className="summary-rating"><div className="summary-rating-line"><strong>{Number(data.rating).toFixed(1)}</strong><span className="stars" aria-label={`${data.rating} de 5 estrelas`}>★★★★★</span></div><span className="review-count">Com base em {data.userRatingCount ?? 0} avaliações no Google</span></div>
        : state === 'fallback'
          ? <p className="rating-pending">A nota geral aparece quando a integração com o Google estiver disponível.</p>
          : <p className="rating-pending">Carregando nota do Google…</p>}
    </div>

    <div className="reviews-column reveal reveal-delay-1">
      <div className="review-carousel-shell">
        <div className="review-carousel-heading"><div><span className="carousel-kicker">{state === 'ready' && showingGoogleComments ? 'GOOGLE' : 'OPINIÕES DE CLIENTES'}</span><h3>Comentários</h3></div><div className="horizontal-controls"><button onClick={previousReview} aria-label="Comentários anteriores"><Icon name="left"/></button><button onClick={nextReview} aria-label="Próximos comentários"><Icon name="right"/></button></div></div>
        <div className="review-viewport" ref={carouselRef} role="region" aria-roledescription="carrossel horizontal" aria-label="Comentários de clientes" tabIndex="0"
          onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); previousReview(); } if (event.key === 'ArrowRight') { event.preventDefault(); nextReview(); } }}
          onScroll={() => { const step = getCardStep(); if (step && carouselRef.current) setActiveIndex(Math.round(carouselRef.current.scrollLeft / step) % slides.length); }}>
          <div className="review-track" ref={trackRef}>{[...slides, ...slides].map((review, index) => <article className="review-card" key={`${review.name}-${index}`} aria-hidden={index >= slides.length}>
            <div className="review-slide-meta"><b>{review.name || 'Google'}</b>{review.age && <span>{review.age}</span>}</div>
            <div className="stars" aria-label={`${review.rating} de 5 estrelas`}>{'★'.repeat(Math.max(0, Math.min(5, Math.round(review.rating))))}</div>
            <p>{review.text}</p>
            <a href={review.href} tabIndex={index >= slides.length ? -1 : 0} target="_blank" rel="noreferrer">{showingGoogleComments ? 'Ver avaliação' : 'Abrir no Google Maps'} <Icon name="arrow"/></a>
          </article>)}</div>
        </div>
        <div className="review-carousel-footer"><span>{String(activeIndex + 1).padStart(2, '0')} <i>/ {String(slides.length).padStart(2, '0')}</i></span><div className="review-carousel-dots horizontal-dots" aria-label="Selecionar comentário">{slides.map((review, index) => <button key={`${review.name}-${index}`} className={index === activeIndex ? 'active' : ''} onClick={() => scrollToIndex(index)} aria-label={`Exibir comentário ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}/>)}</div></div>
      </div>
      {state === 'loading' ? <p className="review-source">Carregando avaliações…</p> : showingGoogleComments ? <p className="review-source">Avaliações fornecidas pelo Google · <a href={data.googleMapsUri || mapsUrl} target="_blank" rel="noreferrer">Ver no Google Maps</a></p> : null}
    </div>
  </div></section>;
}
