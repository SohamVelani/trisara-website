'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: 'reveal' | 'reveal-left' | 'reveal-right';
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  threshold?: number;
}

const delayMap: Record<number, string> = {
  0: '',
  1: 'stagger-1',
  2: 'stagger-2',
  3: 'stagger-3',
  4: 'stagger-4',
  5: 'stagger-5',
  6: 'stagger-6',
};

export default function AnimateOnScroll({
  children,
  className = '',
  animation = 'reveal',
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delayMap[delay] || '';

  return (
    <div
      ref={ref}
      className={`${animation} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
