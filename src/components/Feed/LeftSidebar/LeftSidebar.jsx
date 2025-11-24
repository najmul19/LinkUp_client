import { SidebarItem } from "../../Shared/components/SidebarItem";
import { SuggestedUser } from "../../Shared/components/SuggestedUser";

const LeftSidebar = () => {
  return (
    <aside
      className="col-span-3 bg-white shadow-sm p-6
                               overflow-y-auto h-full hidden lg:block"
    >
      <h2 className="font-semibold text-lg mb-4">Explore</h2>

      <ul className="space-y-4">
        <SidebarItem title="Learning" badge="New" />
        <SidebarItem title="Insights" />
        <SidebarItem title="Find friends" />
        <SidebarItem title="Bookmarks" />
        <SidebarItem title="Group" />
        <SidebarItem title="Gaming" badge="New" />
        <SidebarItem title="Settings" />
        <SidebarItem title="Save post" />
      </ul>

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Suggested People</h3>
        <SuggestedUser name="Steve Jobs" role="CEO of Apple" />
        <SuggestedUser name="Ryan Roslansky" role="CEO of LinkedIn" />
      </div>
    </aside>
  );
};

export default LeftSidebar;
