import React from 'react';

export const RightSide = ({ deletedTask = [], setDeletedTasks }) => {
  const DeleteAll = () => {
    setDeletedTasks([]);
  };

  return (
    <aside className="bg-gray-100 w-[250px] h-screen p-6 py-24 shadow-lg border-l border-gray-300 hidden md:block">
      <h1 className="text-xl font-bold text-gray-700 text-center mb-4 border-b pb-2">Deleted Tasks</h1>
      {deletedTask.length === 0 ? (
        <p className="text-gray-500 text-center">No deleted tasks</p>
      ) : (
        <ul className="space-y-4 overflow-auto h-[80%]">
          {deletedTask.map((todo, index) => (
            <li key={index} className="bg-gray-200 text-gray-600 line-through px-4 py-2 rounded-md text-lg shadow">
              {todo}
            </li>
          ))}
        </ul>
      )}
      <button onClick={DeleteAll} className="w-full mt-4 bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600">
        Clear
      </button>
    </aside>
  );
};
