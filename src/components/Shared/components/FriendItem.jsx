import AvatarImg from "../../../assets/images/Avatar.png";
export const FriendItem = ({ name, status }) => (
  <div className="flex items-center space-x-3 mb-3">
    <img src={AvatarImg} className="w-8 h-8 rounded-full" />
    <span className="font-medium">{name}</span>

    <span
      className={`w-3 h-3 rounded-full ${
        status === "online" ? "bg-green-500" : "bg-gray-400"
      }`}
    ></span>
  </div>
);