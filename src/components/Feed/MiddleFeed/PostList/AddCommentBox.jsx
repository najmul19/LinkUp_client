import { useState, useEffect } from "react";
import AvatarImg from "../../../../assets/images/Avatar.png";
import axios from "axios";

const AddCommentBox = ({
  post,
  user,
  posts,
  setPosts,
  replyingTo,
  setReplyingTo,
  replyUsername
}) => {
  const [comment, setComment] = useState("");
  const BACKEND_URL = "http://localhost:5000";

 useEffect(() => {
  if (replyingTo && replyUsername) {
    const timer = setTimeout(() => {
      setComment(`@${replyUsername} `);
    }, 0);

    return () => clearTimeout(timer);
  }
}, [replyingTo, replyUsername]);


  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const payload = replyingTo
        ? { content: comment, parentCommentId: replyingTo }
        : { content: comment };

      const res = await axios.post(
        `${BACKEND_URL}/api/comments/${post._id}`,
        payload,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? { ...p, comments: [...(p.comments || []), res.data] }
            : p
        )
      );

      setComment("");
      setReplyingTo(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <img src={AvatarImg} className="w-10 h-10 rounded-full" />

      <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center shadow-sm">
        <input
          type="text"
          className="flex-1 bg-transparent focus:outline-none text-sm"
          placeholder={
            replyingTo ? `Replying to ${replyUsername}...` : "Write a comment"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
        />
      </div>

      <button
        onClick={handleCommentSubmit}
        className="cursor-pointer text-blue-500 font-semibold text-sm"
      >
        Post
      </button>
    </div>
  );
};

export default AddCommentBox;
