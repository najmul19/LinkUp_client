import { useState } from "react";
import axios from "axios";

const AddCommentBox = ({ post, user, posts, setPosts }) => {
  const [comment, setComment] = useState("");
  const BACKEND_URL = "http://localhost:5000";

  const handleCommentSubmit = async () => {
    if (!comment) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/comments/${post._id}`,
        { content: comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id ? { ...p, comments: [...(p.comments || []), res.data] } : p
        )
      );

      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2 ml-8">
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 bg-gray-100 px-3 py-2 rounded-full text-sm focus:outline-blue-500"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleCommentSubmit}
        className="text-blue-500 font-semibold text-sm"
      >
        Post
      </button>
    </div>
  );
};

export default AddCommentBox;
