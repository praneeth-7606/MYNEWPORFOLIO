"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const BTN_CLS =
  "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out";
const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  // Boolean state rather than a rebuilt className string: React can bail out on an
  // unchanged boolean, so scrolling no longer schedules a render per event.
  const [isVisible, setIsVisible] = useState(false);
  const frameRequested = useRef(false);

  useEffect(() => {
    const update = () => {
      frameRequested.current = false;
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const handleScroll = () => {
      if (frameRequested.current) return;
      frameRequested.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );

  return (
    <button
      className={isVisible ? BTN_CLS : `${BTN_CLS} hidden`}
      onClick={onClickBtn}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
