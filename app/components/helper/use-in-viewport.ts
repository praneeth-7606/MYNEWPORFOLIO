'use client';

import { RefObject, useEffect, useRef } from 'react';

/**
 * Stamps `data-inview="true" | "false"` on an element as it enters and leaves the
 * viewport, and returns the ref to attach.
 *
 * The flag exists purely to feed the `[data-inview="false"]` rule in globals.scss,
 * which parks every decorative CSS animation inside a section that is scrolled
 * off-screen. So it is written straight to the DOM rather than held in state —
 * routing it through React would re-render a whole section on every scroll-by for
 * no visible benefit.
 *
 * Pass `existingRef` to reuse a ref the component already owns (e.g. one that is
 * also feeding framer-motion's `useScroll`).
 */
export function useInViewportFlag<T extends HTMLElement>(
  existingRef?: RefObject<T>,
  rootMargin = '300px'
) {
  const ownRef = useRef<T>(null);
  const ref = existingRef ?? ownRef;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.inview = entry.isIntersecting ? 'true' : 'false';
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return ref;
}
