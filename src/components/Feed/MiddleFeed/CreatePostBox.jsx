import { useState } from "react";
import AvatarImg from "../../../assets/images/Avatar.png";
import axios from "axios";

const CreatePostBox = ({ user, posts, setPosts }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const BACKEND_URL = "http://localhost:5000";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!content && !image) return alert("Write something or add an image");
    let imageBase64 = null;
    if (image) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(image);
      });
    }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/posts`,
        { content, imageBase64 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts([res.data, ...posts]);
      setContent("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex items-center space-x-3">
        <img src={AvatarImg} className="w-10 h-10 rounded-full" alt="avatar" />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full focus:outline-blue-500"
        />
      </div>
      {preview && <img src={preview} className="rounded-xl mt-3 max-h-60 object-cover" />}
      <div className="flex items-center justify-between mt-4">
        <label className="text-gray-600 text-sm hover:text-blue-500 cursor-pointer">
          Photo
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
        <button onClick={handleCreatePost} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostBox;
