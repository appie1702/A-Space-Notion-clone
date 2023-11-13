import { useState, useEffect } from "react";

import React from "react";

const useScrollTop = (threshold = 10) => {
  const [scrolled, setscrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

export default useScrollTop;
