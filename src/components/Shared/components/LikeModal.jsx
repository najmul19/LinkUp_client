import avatar from "../../../assets/images/Avatar.png";

const LikeModal = ({ show, onClose, users = [] }) => { // default to empty array
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-80 p-4 rounded-xl shadow-lg relative">
        <h3 className="font-semibold text-lg mb-3">Liked by</h3>

        {users.length === 0 ? (
          <p className="text-sm text-gray-500">No likes yet</p>
        ) : (
          users.map((u, i) => (
            <div key={i} className="flex items-center space-x-2 mb-2">
              <img src={avatar} className="w-8 h-8 rounded-full" alt="avatar" />
              <p className="text-sm font-medium">
                {u.firstname} {u.lastname}
              </p>
            </div>
          ))
        )}

        <button
          className="cursor-pointer absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LikeModal;
