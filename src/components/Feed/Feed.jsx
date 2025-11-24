import AvatarImg from "../../assets/images/Avatar.png";
import PostImg from "../../assets/images/post_img.png";
import StoryImg from "../../assets/images/mobile_story_img.png";
import { SidebarItem } from "../Shared/components/SidebarItem";
import { SuggestedUser } from "../Shared/components/SuggestedUser";
import { StoryCard } from "../Shared/components/StoryCard";
import { PostAction } from "../Shared/components/PostAction";
import { FriendItem } from "../Shared/components/FriendItem";
import { AuthContext } from "../../context/AuthContext";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MiddleFeed from "./MiddleFeed/MiddleFeed";
import RightSidebar from "./RightSidebar/RightSidebar";

export default function FeedPage() {
  // const { user } = useContext(AuthContext);
  // console.log(user)
  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden px-6 py-4">
        <LeftSidebar></LeftSidebar>

        <main className="col-span-12 lg:col-span-6 overflow-y-auto h-full pb-16">
          <MiddleFeed></MiddleFeed>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside
          className="col-span-3 bg-white shadow-sm p-6
                          overflow-y-auto h-full hidden xl:block"
        >
          <RightSidebar></RightSidebar>
        </aside>
      </div>
    </div>
  );
}
