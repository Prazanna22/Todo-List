import { useState } from "react";
import TaskItem from "./TaskItem";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

const TodoList = ({ addDeletedTask, filter }) => {
  const [todos, setTodos] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTodos([{ id: Date.now().toString(), text: taskText, complete: false }, ...todos]);
    setTaskText("");
  };

  const completeTask = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      ).sort((a, b) => a.complete - b.complete)
    );
  };

  const deleteTask = (id) => {
    const deletedTask = todos.find((todo) => todo.id === id);
    if (deletedTask) {
      addDeletedTask(deletedTask.text);
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ Handle Drag and Drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  // ✅ Apply Filters
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.complete;
    if (filter === "pending") return !todo.complete;
    return true;
  });

  return (
    <main className="w-full px-4 sm:px-8 md:px-16 pt-20">
      <div className="flex flex-col sm:flex-row gap-2 items-center my-6">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="border p-2 w-full sm:w-3/4 rounded-md"
          placeholder="Add a task..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-1/4">
          Add
        </button>
      </div>

      {/* ✅ Drag and Drop Context */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTodos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <TaskItem key={todo.id} todo={todo} onComplete={completeTask} onDelete={deleteTask} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </main>
  );
};

export default TodoList;
