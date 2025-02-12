import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScrollability = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const canScroll = pageHeight > viewportHeight;

      if (!canScroll) {
        setShowFooter(false); 
        return;
      }

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollPosition = window.innerHeight + window.scrollY;
            setShowFooter(scrollPosition >= pageHeight - 10);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    };

    const observer = new ResizeObserver(() => checkScrollability());
    observer.observe(document.body);

    checkScrollability(); 

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`bg-black text-white text-center p-4 fixed z-99 bottom-0 w-full transition-opacity duration-500 ${
        showFooter ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p>© Developed by Durga Prasanna U</p>
    </footer>
  );
};

export default Footer;
