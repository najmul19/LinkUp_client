
const PostOptionsMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-2 top-2 bg-white shadow-md rounded-lg p-2 w-28">
      <button
        className="block w-full text-left text-sm px-2 py-1 hover:bg-gray-100"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="block w-full text-left text-sm px-2 py-1 hover:bg-gray-100 text-red-500"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostOptionsMenu;
