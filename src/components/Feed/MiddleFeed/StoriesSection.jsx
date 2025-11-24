import { StoryCard } from "../../Shared/components/StoryCard";

const StoriesSection = () => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-3">
      <StoryCard label="Your Story" />
      <StoryCard label="Ryan Roslansky" />
      <StoryCard label="User" />
      <StoryCard label="User" />
    </div>
  );
};

export default StoriesSection;
