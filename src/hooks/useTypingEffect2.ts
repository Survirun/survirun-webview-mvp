import { useState, useEffect } from "react";

export const useTypingEffect2 = (message: string, delay = 50) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (currentIndex < message.length) {
      intervalId = setInterval(() => {
        const currentLetter = message[currentIndex];
        setTypedText((prevTypedText) => prevTypedText + currentLetter);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [message, delay, currentIndex, isActive]);

  const startTyping = () => {
    setIsActive(true);
    setTypedText("");
    setCurrentIndex(0);
  };

  return { typedText, startTyping };
};
