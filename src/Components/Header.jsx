import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-500 text-white fixed top-0 w-full shadow-md z-50 h-[64px] flex items-center justify-between px-4">
      

      {/* ✅ Centered Title */}
      <h1 className="text-xl font-bold flex-grow text-center">To-Do List</h1>

      {/* ✅ Invisible Placeholder for Spacing */}
      <div className="md:hidden w-8"></div>
    </header>
  );
};

export default Header;
