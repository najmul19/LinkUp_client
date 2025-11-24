import { FriendItem } from "../../Shared/components/FriendItem";
import { SuggestedUser } from "../../Shared/components/SuggestedUser";

const RightSidebar = () => {
  return (
    <>
      <h3 className="font-semibold mb-3">You Might Like</h3>
      <SuggestedUser
        name="Radovan SkillArena"
        role="CEO at Trophy"
        showButtons
      />

      <div className="mt-10">
        <h3 className="font-semibold mb-3">Your Friends</h3>

        <FriendItem name="Steve Jobs" status="online" />
        <FriendItem name="Ryan Roslansky" status="online" />
        <FriendItem name="Dylan Field" status="online" />
      </div>
    </>
  );
};

export default RightSidebar;
