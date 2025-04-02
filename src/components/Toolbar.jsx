import React from 'react';

export default function Toolbar({ setStyle }) {
  return (
    <div className="toolbar">
      <button onClick={() => setStyle({ color: 'red' })}>🔴</button>
      <button onClick={() => setStyle({ color: 'blue' })}>🔵</button>
      <button onClick={() => setStyle({ fontSize: '24px' })}>A+</button>
      <button onClick={() => setStyle({ fontSize: '16px' })}>A</button>
      <button onClick={() => setStyle({ fontSize: '12px' })}>A-</button>
      <button onClick={() => setStyle({ fontFamily: 'Courier New' })}>Courier</button>
    </div>
  );
}
