import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './evidence-slider.css';

// Manual navigation only: wheel and page scroll never change the active slide.
export default function EvidenceSlider({ children, label, slideLabels = [] }) {
  const slides = React.Children.toArray(children);
  const [active, setActive] = useState(0);
  const id = useId();
  const gesture = useRef(null);
  const rail = useRef(null);
  const suppressClick = useRef(false);
  const select = (index) => setActive(Math.max(0, Math.min(slides.length - 1, index)));

  useEffect(() => {
    const strip = rail.current;
    const selected = strip?.children[active];
    if (!selected) return;
    if (selected.offsetLeft < strip.scrollLeft || selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2) });
    }
  }, [active]);

  function onKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const next = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return <section className="evidence-slider" tabIndex={0} role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
    <div className="evidence-slider-stage" id={`${id}-slides`}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
        gesture.current = { x: event.clientX, y: event.clientY, dragging: false };
      }}
      onPointerMove={(event) => {
        const start = gesture.current;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (!start.dragging && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
          gesture.current = null;
          return;
        }
        if (!start.dragging && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
          start.dragging = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerUp={(event) => {
        const start = gesture.current;
        gesture.current = null;
        if (!start?.dragging) return;
        suppressClick.current = true;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 50) select(active + (dx < 0 ? 1 : -1));
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { gesture.current = null; }}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (!suppressClick.current || event.detail === 0) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      }}>
      {slides.map((slide, index) => <div key={slide.key} aria-hidden={index !== active} inert={index !== active} className="evidence-slider-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
        {slide}
      </div>)}
    </div>
    <div className="evidence-slider-controls">
      <button type="button" onClick={() => select(active - 1)} disabled={active === 0} aria-label="Previous slide" aria-controls={`${id}-slides`}><ArrowLeft size={20} aria-hidden="true"/></button>
      <span className="evidence-slider-count" role="status" aria-live="polite" aria-atomic="true">{active + 1} / {slides.length}</span>
      <button type="button" onClick={() => select(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide" aria-controls={`${id}-slides`}><ArrowRight size={20} aria-hidden="true"/></button>
    </div>
    <div className="evidence-slider-pills" ref={rail} role="group" aria-label="Choose a prototype screen">
      {slides.map((_, index) => <button key={index} type="button" aria-label={`Show ${slideLabels[index] || `slide ${index + 1}`}`} aria-current={active === index ? 'true' : undefined} aria-controls={`${id}-slides`} onClick={() => select(index)}>{slideLabels[index] || `Slide ${index + 1}`}</button>)}
    </div>
  </section>;
}
