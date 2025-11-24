export const SidebarItem = ({ title, badge }) => (
  <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 cursor-pointer">
    <span>{title}</span>
    {badge && (
      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </li>
);