import { useEffect, useRef, useState } from "react";

/**
 * Cycles through an array of strings with typing and deleting animation.
 * Returns the current display string.
 */
export function useTypingEffect(
  strings: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDelay = 1800,
): string {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (strings.length === 0) return;

    const currentString = strings[currentIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, pauseDelay);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    if (isTyping) {
      if (displayText.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setCurrentIndex((prev) => (prev + 1) % strings.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    displayText,
    isTyping,
    isPaused,
    currentIndex,
    strings,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return displayText;
}
