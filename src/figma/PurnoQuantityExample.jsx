import React, { useState } from 'react';

export default function PurnoQuantityExample() {
  const [packSize, setPackSize] = useState('20');
  const [packs, setPacks] = useState(1);
  const [weight, setWeight] = useState('1');
  return <figure className="purno-quantity-example" aria-label="Interactive quantity example">
    <div className="purno-quantity-grid">
      <div className="purno-quantity-card">
        <p className="purno-quantity-kind">Packaged goods</p>
        <h3>Lay’s Salt and Pepper</h3>
        <label htmlFor="purno-pack-size">Pack size</label>
        <select id="purno-pack-size" value={packSize} onChange={event => setPackSize(event.target.value)}>
          <option value="20">20 g pack</option><option value="50">50 g pack</option><option value="100">100 g pack</option>
        </select>
        <span id="purno-packs-label" className="purno-quantity-label">Number of packs</span>
        <div className="purno-pack-stepper" role="group" aria-labelledby="purno-packs-label">
          <button type="button" aria-label="Remove one pack" disabled={packs === 1} onClick={() => setPacks(value => Math.max(1, value - 1))}>−</button>
          <output aria-live="polite">{packs} {packs === 1 ? 'pack' : 'packs'}</output>
          <button type="button" aria-label="Add one pack" onClick={() => setPacks(value => value + 1)}>+</button>
        </div>
        <p className="purno-quantity-summary">{packs} × {packSize} g {packs === 1 ? 'pack' : 'packs'}</p>
      </div>
      <div className="purno-quantity-card">
        <p className="purno-quantity-kind">Loose goods</p>
        <h3>Blueberries</h3>
        <label htmlFor="purno-weight">Weight in kg</label>
        <div className="purno-weight-input">
          <input id="purno-weight" type="number" inputMode="decimal" min="0.1" step="0.1" value={weight} onChange={event => setWeight(event.target.value)} aria-describedby="purno-weight-help"/>
          <span aria-hidden="true">kg</span>
        </div>
        <p id="purno-weight-help" className="purno-quantity-summary">Enter the weight being sold.</p>
      </div>
    </div>
    <figcaption>Interactive example, clarified for this case study: packaged goods use packs; loose goods use kg. This is a unit-rule correction, separate from the original exploration.</figcaption>
  </figure>;
}
