import bin from "../assets/bin.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = ({ todo, onComplete, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes} // ✅ This applies drag properties but doesn't block child elements
      className="flex w-full gap-3 items-center bg-gray-100 py-4 px-4 my-8 rounded-lg shadow-md"
    >
      {/* ✅ Drag Handle (Prevents Dragging Issues) */}
      <div {...listeners} className="cursor-grab px-2">
        ⠿
      </div>

      {/* ✅ Checkbox (Clicking Works Properly) */}
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => onComplete(todo.id)}
        className="cursor-pointer w-5 h-5"
        onClick={(e) => e.stopPropagation()} // ✅ Prevents drag interference
      />

      {/* ✅ Task Text */}
      <h1 className={todo.complete ? "line-through text-gray-500 text-lg" : "text-lg"}>
        {todo.text}
      </h1>

      {/* ✅ Delete Button (Clicking Works Properly) */}
      <button
        className="ml-auto bg-red-00 rounded-md p-1"
        onClick={(e) => {
          e.stopPropagation(); // ✅ Prevents drag from blocking delete click
          onDelete(todo.id);
        }}
      >
        <img src={bin} alt="delete" className="w-5" />
      </button>
    </li>
  );
};

export default TaskItem;
