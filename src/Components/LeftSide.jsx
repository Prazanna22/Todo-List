import React from "react";

export const LeftSide = ({ setFilter, closeSidebar }) => {
  return (
    <aside className="w-[250px] h-full p-6 shadow-lg fixed top-0 left-0 border-r border-gray-300 pt-24">
      <h1 className="text-xl font-bold text-gray-700 text-center mb-4 border-b pb-2">
        Task Filters
      </h1>

      <div className="space-y-4">
        <button
          onClick={() => {
            setFilter("all");
            closeSidebar(); 
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        >
          All Tasks
        </button>

        <button
          onClick={() => {
            setFilter("completed");
            closeSidebar();
          }}
          className="w-full bg-green-500 text-white py-2 rounded-md shadow hover:bg-green-600"
        >
          Completed Tasks
        </button>

        <button
          onClick={() => {
            setFilter("pending");
            closeSidebar(); // 
          }}
          className="w-full bg-yellow-500 text-white py-2 rounded-md shadow hover:bg-yellow-600"
        >
          Pending Tasks
        </button>
      </div>
    </aside>
  );
};
