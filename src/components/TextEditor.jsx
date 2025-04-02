import React, { useState } from 'react';
import TextDisplay from './TextDisplay';
import Toolbar from './Toolbar';
import EditControls from './EditControls';
import VirtualKeyboard from './VirtualKeyboard';

export default function TextEditor() {
  // Holds the full styled character array
  const [text, setText] = useState([]);

  // Keyboard modes
  const [language, setLanguage] = useState('he'); // 'he' or 'en'
  const [emojiMode, setEmojiMode] = useState(false);
  const [symbolMode, setSymbolMode] = useState(false);

  // Show/hide the hover overlay for quick emojis
  const [emojiOverlayVisible, setEmojiOverlayVisible] = useState(false);

  // For undo functionality
  const [history, setHistory] = useState([]);

  /**
   * Add a character to the text with the current styling
   */
  const handleKeyPress = (char) => {
    const styledChar = { char, style: currentStyle };
    setHistory([...history, [...text]]);
    setText([...text, styledChar]);
    setEmojiOverlayVisible(false);
  };

  /**
   * Delete the last character or word
   */
  const handleDelete = (type) => {
    setHistory([...history, [...text]]);
    if (type === 'char') {
      setText(text.slice(0, -1));
    } else if (type === 'word') {
      let newText = [...text];
      while (newText.length && newText[newText.length - 1].char !== ' ') {
        newText.pop();
      }
      if (newText.length) newText.pop(); // Remove the space
      setText(newText);
    }
  };

  /**
   * Clear the entire text
   */
  const handleClear = () => {
    setHistory([...history, [...text]]);
    setText([]);
  };

  /**
   * Undo the last edit (if available)
   */
  const handleUndo = () => {
    if (history.length > 0) {
      setText(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  /**
   * Replace a specific character in the text
   */
  const handleReplace = () => {
    const toFind = prompt('Enter character to replace:');
    const toReplace = prompt(`Replace "${toFind}" with:`);
    const updated = text.map((item) =>
      item.char === toFind ? { ...item, char: toReplace } : item
    );
    setHistory([...history, [...text]]);
    setText(updated);
  };

  /**
   * Cycle between Hebrew and English (default keyboard mode)
   */
  const cycleLanguage = () => {
    setLanguage((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  return (
    <div className="text-editor">

      {/* Live preview of styled text */}
      <TextDisplay text={text} />

      {/* Font / size / color toolbar */}
      <Toolbar setStyle={(style) => setCurrentStyle({ ...currentStyle, ...style })} />

      {/* On-screen keyboard (language / emoji / symbol) */}
      <VirtualKeyboard
        language={language}
        emojiMode={emojiMode}
        symbolMode={symbolMode}
        emojiOverlayVisible={emojiOverlayVisible}
        onKeyPress={handleKeyPress}
        onCycleLanguage={cycleLanguage}
        onToggleEmojiMode={() => {
          setEmojiMode(!emojiMode);
          setSymbolMode(false); // Only one mode at a time
        }}
        onToggleSymbolMode={() => {
          setSymbolMode(!symbolMode);
          setEmojiMode(false); // Only one mode at a time
        }}
        onHoverEmojiButton={() => setEmojiOverlayVisible(true)}
        onLeaveEmojiButton={() => setEmojiOverlayVisible(false)}
      />

      {/* Clear, Delete, Undo, Replace controls */}
      <EditControls
        onDelete={handleDelete}
        onUndo={handleUndo}
        onReplace={handleReplace}
        onClear={handleClear}
      />
    </div>
  );
}
