// import StoryImg from "../../assets/images/mobile_story_img.png";
import StoryImg from "../../../assets/images/mobile_story_img.png";
export const StoryCard = ({ label }) => (
  <div className="w-32 h-48 bg-white rounded-xl shadow relative overflow-hidden">
    <img
      src={StoryImg}
      className="w-full h-full object-cover"
      alt="story"
    />
    <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
      {label}
    </div>
  </div>
);