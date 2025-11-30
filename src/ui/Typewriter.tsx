import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  sentences: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  sentences, 
  typingSpeed = 80, 
  deletingSpeed = 40, 
  pauseTime = 2000,
  className = "" 
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor logic
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index >= sentences.length) {
      setIndex(0);
      return;
    }

    // Finished typing sentence, wait then delete
    if (subIndex === sentences[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    // Finished deleting, go to next sentence
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % sentences.length);
      return;
    }

    // Typing or Deleting
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, sentences, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {sentences[index].substring(0, subIndex)}
      <span className={`ml-1 inline-block w-0.5 h-5 align-middle bg-cyan-400 ${blink ? 'opacity-100' : 'opacity-0'}`}>&nbsp;</span>
    </span>
  );
};

export default Typewriter;