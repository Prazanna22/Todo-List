import React from "react";

export const LeftSide = ({ setFilter, closeSidebar }) => {
  return (
    <aside className="w-[250px] h-full p-6 pt-24 shadow-lg fixed top-0 left-0 border-r  border-gray-300 bg-gray-100">
      <h1 className="text-xl font-bold text-gray-700 text-center mb-6 border-b pb-2">
        Task Filters
      </h1>

      <div className="space-y-4">
        {["all", "completed", "pending"].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setFilter(filter);
              closeSidebar();
            }}
            className={`w-full py-3 rounded-md shadow transition ${
              filter === "all"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : filter === "completed"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks
          </button>
        ))}
      </div>
    </aside>
  );
};
