import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-500 text-white fixed top-0 w-full shadow-md z-50 h-[64px] flex items-center justify-between px-4">
      <button className="md:hidden px-2 py-1 bg-white text-blue-500 rounded shadow z-50" onClick={toggleSidebar}>
        ☰
      </button>
      <h1 className="text-2xl font-bold flex-grow text-center">To-Do List</h1>
      <div className="md:hidden w-8"></div>
    </header>
  );
};

export default Header;
