import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TodoList = ({ addDeletedTask, filter }) => {
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      return Array.isArray(storedTodos) ? storedTodos : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = { id: Date.now().toString(), text: taskText, complete: false };
    setTodos([newTask, ...todos]);
    setTaskText("");
  };

  const completeTask = (id) => {
    setTodos((prev) =>
      prev
        .map((todo) =>
          todo.id === id ? { ...todo, complete: !todo.complete } : todo
        )
        .sort((a, b) => a.complete - b.complete)
    );
  };

  const deleteTask = (id) => {
    const deletedTask = todos.find((todo) => todo.id === id);

    if (deletedTask) {
      const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
      const updatedDeletedTasks = [...storedDeletedTasks, deletedTask.text];
      localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
      addDeletedTask(deletedTask.text);
    }

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.complete;
    if (filter === "pending") return !todo.complete;
    return true;
  });

  return (
    <main className="w-full px-4 sm:px-8 md:px-16 pt-20 flex flex-col min-h-[calc(100vh-80px)]">
      <div className=" px-6  ">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border-2 border-black p-3 w-full sm:w-3/4 rounded-md"
            placeholder="Add a task..."
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-5 py-3 rounded-md w-full sm:w-1/4">
            Add
          </button>
        </div>
      </div>

      <div className={`flex-grow ${filteredTodos.length >= 6 ? "overflow-y-auto" : ""} p-6`}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredTodos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
            <ul className={`space-y-4 ${filteredTodos.length >= 6 ? "h-full" : "h-auto"}`}>
              {filteredTodos.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No tasks available.</p>
              ) : (
                filteredTodos.map((todo) => (
                  <TaskItem key={todo.id} todo={todo} onComplete={completeTask} onDelete={deleteTask} />
                ))
              )}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </main>



  );
};

export default TodoList;
