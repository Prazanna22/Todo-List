import bin from "../assets/bin.png";

const TaskItem = ({ todo, onComplete, onDelete }) => {
  return (
    <ul className="flex flex-col gap-3 justify-center items-center w-full pb-20">
      {todo.map((todo, index) => (
        <div key={index} className="flex gap-3 items-center bg-gray-100 py-12 px-4 w-full rounded-lg shadow-md">
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => onComplete(todo.id)}
            className="cursor-pointer w-5 h-5"
          />
          <h1 className={todo.complete ? "line-through text-gray-500 text-lg" : "text-lg"}>
            {todo.text}
          </h1>
          <button
            className="ml-auto bg-red-100 rounded-md p-1"
            onClick={() => onDelete(todo.id)}
          >
            <img src={bin} alt="delete" className="w-5" />
          </button>
        </div>
      ))}
    </ul>
  );
};

export default TaskItem;
