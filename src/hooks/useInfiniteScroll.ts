import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
    const observerRef = useRef<IntersectionObserver | null>(null);
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '50px',
      }
    );

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  useEffect(() => {
    const currentTarget = target;
    const currentObserver = observerRef.current;

    if (currentTarget && currentObserver) {
      currentObserver.observe(currentTarget);

      return () => {
        if (currentTarget) {
          currentObserver.unobserve(currentTarget);
        }
      };
    }
  }, [target]);

  return setTarget;
}