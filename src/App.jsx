import { useState, useEffect } from "react";
import { LeftSide } from "./Components/LeftSide";
import { RightSide } from "./Components/RightSide";
import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    if (Array.isArray(storedDeletedTasks)) {
      setDeletedTasks(storedDeletedTasks);
    }
  }, []);

  const [filter, setFilter] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);

  const addDeletedTask = (todo) => {
    const updatedDeletedTasks = [...deletedTasks, todo];
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex flex-col md:flex-row flex-grow">
      <div
  className={`fixed md:sticky top-0 left-0 w-full md:w-[250px] h-screen md:h-screen z-10  transition-transform duration-300 ease-in-out
  ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
>


          <LeftSide setFilter={setFilter} closeSidebar={() => setShowSidebar(false)} />
        </div>
        <main className={`transition-all duration-300 flex-grow p-4 bg-gray-100 h-auto ${deletedTasks.length > 0 ? "md:mr-[250px]" : "mr-0"}`}>
          <TodoList addDeletedTask={addDeletedTask} filter={filter} />
        </main>

        {deletedTasks.length > 0 && (
          <div className="hidden md:block w-[250px] fixed right-0 top-0 h-full">
            <RightSide deletedTask={deletedTasks} setDeletedTasks={setDeletedTasks} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
