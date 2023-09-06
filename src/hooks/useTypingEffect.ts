import { useState, useEffect } from "react";

export const useTypingEffect = (messages: string[], delay: number) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && currentIndex < messages[activeMessageIndex].length) {
      intervalId = setInterval(() => {
        const currentLetter = messages[activeMessageIndex][currentIndex];
        setTypedText((prevTypedText) => prevTypedText + currentLetter);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [messages, delay, currentIndex, isActive, activeMessageIndex]);

  const startTyping = () => {
    setIsActive(true);
    setActiveMessageIndex(0);
    setTypedText("");
    setCurrentIndex(0);
  };

  const nextMessage = () => {
    if (activeMessageIndex < messages.length - 1) {
      setActiveMessageIndex((prevIndex) => prevIndex + 1);
      setTypedText("");
      setCurrentIndex(0);
      return true; 
    } else {
      setIsActive(false);
      return false; 
    }
  };
  

  return { typedText, startTyping, nextMessage };
};
