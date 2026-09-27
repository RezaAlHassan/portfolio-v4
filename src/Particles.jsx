import React, { useEffect, useRef, useState } from 'react';

const shapes = ['Tangled path', 'Clear flow'];
const count = 2400;
const homeCache = new Map();

// Fill both shapes with the same dots, then pair homes by angle.
function sample(shape) {
  if (homeCache.has(shape)) return homeCache.get(shape);
  const paths = [];
  const fills = [];
  if (shape === 'Tangled path') {
    // A single looping route: visible uncertainty before the flow is structured.
    paths.push(Array.from({ length: 181 }, (_, i) => {
      const t = i / 180 * Math.PI * 2;
      return [180 + 150 * Math.sin(3 * t + .3), 120 + 92 * Math.sin(4 * t)];
    }));
    fills.push(paths[0]);
  } else if (shape === 'Clear flow') {
    for (const [x, y] of [[24, 36], [222, 36], [222, 148], [24, 148]]) {
      fills.push([[x, y], [x + 114, y], [x + 114, y + 56], [x, y + 56]]);
    }
    paths.push([[138, 64], [222, 64]], [[210, 54], [222, 64], [210, 74]]);
    paths.push([[279, 92], [279, 148]], [[269, 136], [279, 148], [289, 136]]);
    paths.push([[222, 176], [138, 176]], [[150, 166], [138, 176], [150, 186]]);
    fills.push([[210, 54], [222, 64], [210, 74]], [[269, 136], [279, 148], [289, 136]], [[150, 166], [138, 176], [150, 186]]);
  }
  const segments = paths.flatMap(path => path.slice(1).map((b, i) => [path[i], b]));
  const inside = (x, y, polygon) => {
    let hit = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [ax, ay] = polygon[i], [bx, by] = polygon[j];
      if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) hit = !hit;
    }
    return hit;
  };
  const nearPath = (x, y) => segments.some(([a, b]) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)));
    return (x - a[0] - t * dx) ** 2 + (y - a[1] - t * dy) ** 2 < 2.5 ** 2;
  });
  // Deterministic area sampling avoids clumps and changes only the homes.
  const sequence = (index, base) => {
    let value = 0, fraction = 1;
    while (index > 0) { fraction /= base; value += fraction * (index % base); index = Math.floor(index / base); }
    return value;
  };
  const points = [];
  for (let i = 1; points.length < count; i++) {
    const x = 20 + sequence(i, 2) * 320, y = 24 + sequence(i, 3) * 188;
    if (fills.some(polygon => inside(x, y, polygon)) || (shape === 'Clear flow' && nearPath(x, y))) points.push({ x, y });
  }
  points.sort((a, b) => Math.atan2(a.y - 120, a.x - 180) - Math.atan2(b.y - 120, b.x - 180));
  homeCache.set(shape, points);
  return points;
}

export function Particles({ shape = 'Clear flow', reach = 80, force = 60, grain = 'Fine' }) {
  const [current, setCurrent] = useState(shapes.includes(shape) ? shape : 'Clear flow');
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ink = getComputedStyle(stageRef.current).color;
    const dots = sample(shapes.includes(shape) ? shape : 'Clear flow').map(home => ({ home, x: home.x, y: home.y, vx: 0, vy: 0 }));
    let frame = 0, visible = true, last = 0;
    const draw = () => {
      ctx.setTransform(canvas.width / 360, 0, 0, canvas.height / 240, 0, 0);
      ctx.clearRect(0, 0, 360, 240);
      ctx.fillStyle = ink;
      const radius = grain === 'Coarse' ? 1.8 : 1;
      for (const dot of dots) {
        const stretch = 1 + Math.min(Math.hypot(dot.vx, dot.vy) * .12, 3);
        ctx.beginPath();
        ctx.ellipse(dot.x, dot.y, radius * stretch, radius / Math.sqrt(stretch), Math.atan2(dot.vy, dot.vx), 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const tick = time => {
      frame = 0;
      const dt = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      let energy = 0;
      for (const dot of dots) {
        dot.vx = (dot.vx + (dot.home.x - dot.x) * .05 * dt) * Math.pow(.84, dt);
        dot.vy = (dot.vy + (dot.home.y - dot.y) * .05 * dt) * Math.pow(.84, dt);
        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;
        energy += Math.abs(dot.vx) + Math.abs(dot.vy) + Math.abs(dot.home.x - dot.x) + Math.abs(dot.home.y - dot.y);
      }
      if (energy < .5) for (const dot of dots) { dot.x = dot.home.x; dot.y = dot.home.y; dot.vx = dot.vy = 0; }
      draw();
      if (energy >= .5 && visible && !motion.matches) frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame && visible && !motion.matches) { last = performance.now(); frame = requestAnimationFrame(tick); }
    };
    const settle = () => {
      cancelAnimationFrame(frame); frame = 0;
      for (const dot of dots) { dot.x = dot.home.x; dot.y = dot.home.y; dot.vx = dot.vy = 0; }
      draw();
    };
    engineRef.current = {
      change(next) {
        const homes = sample(next);
        dots.forEach((dot, i) => { dot.home = homes[i]; });
        if (motion.matches) settle(); else wake();
      },
      push(event, shock = false) {
        if (motion.matches) return;
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * 360 / rect.width;
        const y = (event.clientY - rect.top) * 240 / rect.height;
        const radius = (shock ? 200 : Math.max(30, Math.min(160, reach))) * 360 / rect.width;
        for (const dot of dots) {
          const dx = dot.x - x, dy = dot.y - y, distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < radius) {
            const strength = (1 - distance / radius) ** 2 * (shock ? 30 : Math.max(0, Math.min(100, force)) * .12);
            dot.vx += dx / distance * strength;
            dot.vy += dy / distance * strength;
          }
        }
        wake();
      },
    };
    const resize = new ResizeObserver(() => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      draw();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake(); else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(canvas);
    const onMotion = () => { if (motion.matches) settle(); };
    motion.addEventListener('change', onMotion);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); motion.removeEventListener('change', onMotion); engineRef.current = null; };
  }, [shape, reach, force, grain]);

  useEffect(() => { engineRef.current?.change(current); }, [current, shape, reach, force, grain]);

  const next = () => setCurrent(value => shapes[(shapes.indexOf(value) + 1) % shapes.length]);
  return <div className="hero-particles">
    <button ref={stageRef} type="button" className="particle-stage" aria-label={`${current} made of dots. Change to ${shapes[(shapes.indexOf(current) + 1) % shapes.length]}.`} onPointerMove={event => { if (event.pointerType !== 'touch') engineRef.current?.push(event); }} onClick={event => { if (event.detail > 0) engineRef.current?.push(event, true); next(); }}>
      <canvas ref={canvasRef} aria-hidden="true"/>
    </button>
    <span className="particle-hint">Hover</span>
  </div>;
}
