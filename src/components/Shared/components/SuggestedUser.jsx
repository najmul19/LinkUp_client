import AvatarImg from "../../../assets/images/Avatar.png";
export const SuggestedUser = ({ name, role, showButtons }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <img src={AvatarImg} className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>

    {showButtons && (
      <div className="space-x-2">
        <button className="px-3 py-1 text-sm border rounded-lg">Ignore</button>
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
          Follow
        </button>
      </div>
    )}
  </div>
);
