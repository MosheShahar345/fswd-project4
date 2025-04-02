import React, { useState } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import Toolbar from './Toolbar';
import LangSelector from './LangSelector';
import EditControls from './EditControls';
import TextDisplay from './TextDisplay';

export default function TextEditor() {
  const [text, setText] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({
    color: 'black',
    fontSize: '16px',
    fontFamily: 'Arial',
  });
  const [language, setLanguage] = useState('he');
  const [history, setHistory] = useState([]);

  const handleKeyPress = (char) => {
    const styledChar = { char, style: currentStyle };
    setHistory([...history, [...text]]);
    setText([...text, styledChar]);
  };

  const handleDelete = (type) => {
    setHistory([...history, [...text]]);
    if (type === 'char') {
      setText(text.slice(0, -1));
    } else if (type === 'word') {
      let newText = [...text];
      while (newText.length && newText[newText.length - 1].char !== ' ') {
        newText.pop();
      }
      if (newText.length) newText.pop(); // remove the space
      setText(newText);
    }
  };

  const handleClear = () => {
    setHistory([...history, [...text]]);
    setText([]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setText(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const handleReplace = () => {
    const toFind = prompt('Enter character to replace:');
    const toReplace = prompt(`Replace "${toFind}" with:`);
    const updated = text.map((item) =>
      item.char === toFind ? { ...item, char: toReplace } : item
    );
    setHistory([...history, [...text]]);
    setText(updated);
  };

  return (
    <div className="text-editor">
      <TextDisplay text={text} />
      <LangSelector language={language} onChange={setLanguage} />
      <Toolbar setStyle={(style) => setCurrentStyle({ ...currentStyle, ...style })} />
      <VirtualKeyboard language={language} onKeyPress={handleKeyPress} />
      <EditControls
        onDelete={handleDelete}
        onUndo={handleUndo}
        onReplace={handleReplace}
        onClear={handleClear}
      />
    </div>
  );
}
