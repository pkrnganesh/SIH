import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setIndex(0);
  }, [text]); // reset if text changes

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return <span>{displayText}</span>;
};

export default TypewriterEffect;
