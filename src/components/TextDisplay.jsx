import React from 'react';

export default function TextDisplay({ text }) {
  return (
    <div className="text-display">
      {text.map((item, i) => (
        <span key={i} style={item.style}>{item.char}</span>
      ))}
    </div>
  );
}
