import { useState } from "react";
import { LeftSide } from "./Components/LeftSide";
import { RightSide } from "./Components/RightSide";
import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false); // ✅ For mobile menu

  const addDeletedTask = (todo) => {
    setDeletedTasks((prev) => [...prev, todo]);
  };

  return (
    <>
      <button
        className="md:hidden bg-blue-500 text-white p-2 fixed top-2 left-2 z-100 rounded shadow-lg"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "X" : "☰"}
      </button>

      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex flex-col md:flex-row h-screen">
        {/* ✅ Pass setShowSidebar to LeftSide */}
        <div
          className={`fixed md:relative  w-full md:w-[200px] bg-gray-100 z-10 ${
            showSidebar ? "block h-screen" : "hidden md:block"
          }`}
        >
          <LeftSide setFilter={setFilter} closeSidebar={() => setShowSidebar(false)} />
        </div>

        <main
          className={`transition-all duration-300 flex-grow p-4 bg-gray-100 min-h-screen ${
            deletedTasks.length > 0 ? "md:mr-[250px]" : "mr-0"
          }`}
        >
          <TodoList addDeletedTask={addDeletedTask} filter={filter} />
        </main>

        {deletedTasks.length > 0 && (
          <div className="hidden md:block w-[250px] fixed right-0 top-0 h-full">
            <RightSide deletedTask={deletedTasks} setDeletedTasks={setDeletedTasks} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
