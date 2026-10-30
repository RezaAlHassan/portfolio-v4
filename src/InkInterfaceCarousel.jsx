import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ExpandableImage } from './LegacyPortfolio';
import './ink-interface-carousel.css';

// Full-size interface evidence with immediate, manual slide selection.
export default function InkInterfaceCarousel({ slides, label }) {
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const carousel = useRef(null);
  const layers = useRef([]);
  const rail = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const id = useId();

  useEffect(() => {
    const strip = rail.current;
    const selected = strip?.children[active];
    if (!selected) return;
    if (selected.offsetLeft < strip.scrollLeft || selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2) });
    }
  }, [active]);

  function select(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current.current) return;
    if (layers.current[current.current]?.contains(document.activeElement)) carousel.current?.focus({ preventScroll: true });
    current.current = next;
    setActive(next);
  }

  function onKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const next = { ArrowLeft: current.current - 1, ArrowRight: current.current + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return <section className="ink-interface-carousel" ref={carousel} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
    <div className="ink-interface-stage" id={`${id}-images`}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
        gesture.current = { x: event.clientX, y: event.clientY, dragging: false };
      }}
      onPointerMove={event => {
        const start = gesture.current;
        if (!start) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        if (!start.dragging && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
        if (!start.dragging && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
          start.dragging = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerUp={event => {
        const start = gesture.current;
        gesture.current = null;
        if (!start?.dragging) return;
        suppressClick.current = true;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 50) select(current.current + (dx < 0 ? 1 : -1));
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { gesture.current = null; }}
      onDragStart={event => event.preventDefault()}
      onClickCapture={event => {
        if (!suppressClick.current || event.detail === 0) return;
        event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
      }}>
      {slides.map((slide, index) => <div key={slide.src} ref={element => { layers.current[index] = element; }} className="ink-interface-slide"
        data-active={index === active || undefined}
        aria-hidden={index !== active} inert={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
        <ExpandableImage src={slide.src} alt={slide.alt} caption={slide.title} loading="eager"/>
      </div>)}
    </div>
    <div className="ink-interface-caption"><h3>{slides[active].title}</h3><p>{slides[active].description}</p></div>
    <div className="ink-interface-controls">
      <button type="button" aria-label="Previous interface" aria-controls={`${id}-images`} disabled={active === 0} onClick={() => select(current.current - 1)}><ArrowLeft size={18} aria-hidden="true"/></button>
      <span role="status" aria-live="polite" aria-atomic="true">{active + 1} / {slides.length}</span>
      <button type="button" aria-label="Next interface" aria-controls={`${id}-images`} disabled={active === slides.length - 1} onClick={() => select(current.current + 1)}><ArrowRight size={18} aria-hidden="true"/></button>
    </div>
    <div className="ink-interface-pills" ref={rail} role="group" aria-label="Choose an interface">
      {slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Show ${slide.title}`} aria-current={index === active ? 'true' : undefined} aria-controls={`${id}-images`} onClick={() => select(index)}>
        {slide.title}
      </button>)}
    </div>
  </section>;
}
