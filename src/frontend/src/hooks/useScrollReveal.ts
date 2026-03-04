import { useEffect, useRef, useState } from "react";

/**
 * Uses IntersectionObserver to reveal elements when they enter the viewport.
 * Returns [ref, isVisible].
 */
export function useScrollReveal(
  threshold = 0.1,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}
