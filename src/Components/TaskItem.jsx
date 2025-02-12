import bin from "../assets/bin.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = ({ todo, onComplete, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes} 
      className="flex w-full gap-3 items-center bg-gray-100 py-4 px-4 my-4 rounded-lg shadow-md cursor-default"
    >
      
      <div {...listeners} className="cursor-grab px-2 select-none" aria-label="Drag task">
        ⠿
      </div>

 
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => onComplete(todo.id)}
        className="cursor-pointer w-5 h-5"
        onClick={(e) => e.stopPropagation()} 
      />

   
      <h1 className={`text-lg ${todo.complete ? "line-through text-gray-500" : ""}`}>
        {todo.text}
      </h1>

     
      <button
        className="ml-auto bg-red-100 hover:bg-red-200 rounded-md p-1 transition"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        aria-label="Delete task"
      >
        <img src={bin} alt="delete" className="w-5" />
      </button>
    </li>
  );
};

export default TaskItem;
