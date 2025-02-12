import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      setShowFooter(scrolled >= scrollableHeight - 10); // ✅ Detect when fully scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`bg-gray-800 text-white text-center z-99  p-4 transition-all duration-600 fixed bottom-0 w-full ${
        showFooter ? "block" : "hidden"
      }`}
    >
      <p>© 2025 To-Do List App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
