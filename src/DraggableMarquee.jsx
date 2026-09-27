import React, { useEffect, useRef, useState } from 'react';
export function DraggableMarquee({ items, speed = 1, className = '', renderItem }) {
  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const motion = useRef({ hover: false, focus: false, pressed: false, paused: false });
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const viewport = viewportRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let period = 0, visible = false, frame, previous = 0, position = 0;
    const measure = () => {
      period = viewport.firstElementChild.getBoundingClientRect().width + 16;
      if (!motion.current.focus && !dragRef.current) viewport.scrollLeft = period;
      position = viewport.scrollLeft;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(viewport);
    measure();
    const tick = now => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      const state = motion.current;
      if (visible && !document.hidden && !reduced.matches && !state.hover && !state.focus && !state.pressed && !state.paused && document.body.style.overflow !== 'hidden' && period) {
        let next = position + elapsed * 0.02 * speed;
        if (next >= period * 2) next -= period;
        if (next < period) next += period;
        viewport.scrollLeft = next;
        position = next;
      } else position = viewport.scrollLeft;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); };
  }, [items, speed]);
  const move = direction => {
    const viewport = viewportRef.current;
    const first = viewport.querySelector('.marquee-item');
    const step = first ? first.getBoundingClientRect().width + 16 : viewport.clientWidth;
    viewport.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const finishDrag = event => {
    if (viewportRef.current.hasPointerCapture(event.pointerId)) viewportRef.current.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    motion.current.pressed = false;
    setDragging(false);
  };
  return <div className={`draggable-marquee ${className}`}>
    <div ref={viewportRef} className="marquee-viewport" role="region" aria-label={`Orderific component cards. Drag or use arrow keys. Press Space to ${paused ? 'resume' : 'pause'} automatic movement.`} aria-keyshortcuts="Space ArrowLeft ArrowRight" tabIndex={0} data-dragging={dragging || undefined}
      onMouseEnter={() => { motion.current.hover = true; }} onMouseLeave={() => { motion.current.hover = false; }}
      onFocusCapture={() => { motion.current.focus = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) motion.current.focus = false; }}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
        if (event.code === 'Space') { event.preventDefault(); motion.current.paused = !motion.current.paused; setPaused(motion.current.paused); }
      }}
      onPointerDown={event => { suppressClick.current = false; motion.current.pressed = true; if (event.pointerType === 'mouse' && event.button === 0) dragRef.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; }}
      onPointerMove={event => {
        const drag = dragRef.current;
        if (!drag) return;
        const distance = event.clientX - drag.x;
        if (Math.abs(distance) > 6) {
          suppressClick.current = true;
          setDragging(true);
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.scrollLeft = drag.scroll - distance;
        }
      }}
      onPointerUp={finishDrag} onPointerCancel={finishDrag}
      onPointerLeave={event => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) finishDrag(event); }}
      onDragStart={event => event.preventDefault()}
      onClickCapture={event => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); } }}>
      {[0, 1, 2].map(group => <div className="marquee-group" key={group} aria-hidden={group !== 1 || undefined}>
        {items.map(item => <div className="marquee-item" key={item.id} style={{ aspectRatio: `${item.width} / ${item.height}` }}>{renderItem ? renderItem(item, { duplicate: group !== 1 }) : <img src={item.src} alt={group === 1 ? item.alt : ''} width={item.width} height={item.height} loading="lazy" draggable="false"/>}</div>)}
      </div>)}
    </div>
  </div>;
}
