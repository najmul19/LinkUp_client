import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { StoryCard } from "../../Shared/components/StoryCard";
import axios from "axios";

const StoriesSection = () => {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const BACKEND_URL = "http://localhost:5000";

  // Fetch stories


  // Fetch on mount or when user changes
useEffect(() => {
  if (!user?.token) return;

  const fetchStories = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/stories`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const storiesWithNames = res.data.map((s) => ({
        ...s,
        userName: s.userName || "User",
      }));
      setStories(storiesWithNames);
    } catch (err) {
      console.error(err);
    }
  };

  fetchStories();
}, [user?.token]);


  // Open modal
  const handleCreateClick = () => setShowModal(true);

  const handleStoryClick = (story) => {
    alert(`Story clicked: ${story.content || "Image Story"}`);
  };

  // Submit story
  const handleSubmitStory = async () => {
    try {
      let imageBase64 = "";
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        await new Promise((resolve) => {
          reader.onload = () => {
            imageBase64 = reader.result.split(",")[1];
            resolve();
          };
        });
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/stories`,
        { imageBase64, content: text },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Add userName to new story
      const newStory = { ...res.data, userName: `${user.firstname} ${user.lastname}` };
      setStories([newStory, ...stories]);
      setShowModal(false);
      setText("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to create story");
    }
  };

  return (
    <div>
      <div className="flex space-x-4 overflow-x-auto pb-3">
        <StoryCard label="Create Story" isCreate onClick={handleCreateClick} />
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            label={story.userName}
            image={story.image}
            content={story.content}
            onClick={() => handleStoryClick(story)}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-80">
            <h2 className="font-bold text-lg mb-2">Create Story</h2>
            <textarea
              placeholder="Write something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitStory}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesSection;
