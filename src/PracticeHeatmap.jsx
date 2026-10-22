import React from 'react';
import './practice-heatmap.css';

const weeks = 42;
const rows = 7;

// A decorative pattern, not a record of dated work or contribution counts.
const cells = Array.from({ length: weeks * rows }, (_, index) => {
  const week = Math.floor(index / rows);
  const day = index % rows;
  const seed = (week * 31 + day * 17 + week * day * 7) % 101;
  if (seed < 24 || (day === 0 && seed < 58)) return 'quiet';
  return (Math.floor(week / 3) + day) % 3 === 0 ? 'design' : 'code';
});

// Keep the random-looking pattern stable across renders and server hydration.
const randomValue = index => {
  let value = Math.imul(index + 1, 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return (value ^ (value >>> 16)) >>> 0;
};
const activeCells = cells.map((practice, index) => ({ practice, index }))
  .filter(cell => cell.practice !== 'quiet')
  .sort((a, b) => randomValue(a.index) - randomValue(b.index));
const clearedCells = new Set(activeCells.slice(0, Math.round(activeCells.length * 0.2)).map(cell => cell.index));

export default function PracticeHeatmap() {
  return <section className="practice-heatmap" aria-labelledby="practice-title">
    <div className="practice-heading">
      <h2 id="practice-title">Code + design</h2>
      <ul className="practice-legend" aria-label="Heatmap colours">
        <li><span className="practice-cell" data-practice="code" aria-hidden="true"/>Code</li>
        <li><span className="practice-cell" data-practice="design" aria-hidden="true"/>Design</li>
      </ul>
    </div>
    <svg className="practice-pattern" viewBox={`0 0 ${weeks * 16 - 2} 110`} role="img" aria-labelledby="practice-pattern-title practice-pattern-description">
      <title id="practice-pattern-title">Code and design heatmap</title>
      <desc id="practice-pattern-description">An illustrative activity pattern with green squares for code, blue squares for design, and light grey gaps. This is not a daily activity log.</desc>
      {cells.map((practice, index) => <rect key={index} className="practice-cell"
        data-practice={clearedCells.has(index) ? 'quiet' : practice} data-shade={randomValue(index + cells.length) % 3}
        x={Math.floor(index / rows) * 16} y={(index % rows) * 16} width="14" height="14" rx="3"/>)}
    </svg>
    <p className="practice-caption">An illustrative rhythm of coding and design.</p>
  </section>;
}
