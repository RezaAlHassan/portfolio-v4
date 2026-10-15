import React, { useMemo } from 'react';
import { DraggableMarquee } from './DraggableMarquee';

export function EvidenceGrid({ children, className = '', ...props }) {
  return <div className={`case-evidence-grid ${className}`} {...props}>{children}</div>;
}

export function ComparisonGrid({ children, className = '', ...props }) {
  return <div className={`case-comparison-grid ${className}`} {...props}>{children}</div>;
}

export function EvidenceTicker({ children, className = '', label }) {
  const items = useMemo(() => {
    const figures = React.Children.toArray(children).filter(React.isValidElement);
    return figures.map((figure, index) => ({ id: index, width: 680, height: 500, figure }));
  }, [children]);
  return <div className={`case-evidence-ticker ${className}`} aria-label={label}>
    <DraggableMarquee items={items} speed={.65} label={label} className="evidence-ticker-row" renderItem={(item, { duplicate }) => React.cloneElement(item.figure, {}, React.Children.map(item.figure.props.children, child => React.isValidElement(child) && child.type !== 'figcaption' ? React.cloneElement(child, { tabIndex: duplicate ? -1 : undefined }) : child))}/>
  </div>;
}
