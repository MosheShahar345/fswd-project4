import React from 'react';

const keyboards = {
  he: ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת',' '],
  en: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '],
  emoji: ['😀','😎','🔥','❤️','🎉','👀','💻','🚀','🌟','🤖',' ']
};

export default function VirtualKeyboard({ onKeyPress, language }) {
  return (
    <div className="keyboard">
      {keyboards[language].map((char, i) => (
        <button key={i} onClick={() => onKeyPress(char)}>{char}</button>
      ))}
    </div>
  );
}
