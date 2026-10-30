import React from 'react';
import './ambient-background.css';

// Local CSS version of the supplied Framer component, shared by previews and cases.
export default function AmbientBackground() {
  return <div className="ambient-background" aria-hidden="true">
    <div className="ambient-blob ambient-blob-one"/>
    <div className="ambient-blob ambient-blob-two"/>
    <div className="ambient-blob ambient-blob-three"/>
    <div className="ambient-blur"/>
    <div className="ambient-white"/>
  </div>;
}
