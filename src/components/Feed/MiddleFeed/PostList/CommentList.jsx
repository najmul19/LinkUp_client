import { useState } from "react";
import AvatarImg from "../../../../assets/images/Avatar.png";
import axios from "axios";

const CommentList = ({ post, user, posts, setPosts }) => {
  const [replyInputs, setReplyInputs] = useState({});
  const BACKEND_URL = "http://localhost:5000";

  const handleCommentLike = async (commentId) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/comments/${commentId}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                comments: p.comments.map((c) =>
                  c._id === commentId ? { ...c, likes: res.data } : c
                ),
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplySubmit = async (parentCommentId) => {
    const content = replyInputs[parentCommentId];
    if (!content) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/comments/${post._id}`,
        { content, parentCommentId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? { ...p, comments: [...(p.comments || []), res.data] }
            : p
        )
      );

      setReplyInputs({ ...replyInputs, [parentCommentId]: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ml-8 mt-2">
      {post.comments?.map((comment) => (
        <div key={comment._id} className="flex flex-col mb-2">
          <div className="flex items-start space-x-2">
            <img src={AvatarImg} className="w-7 h-7 rounded-full" />
            <div className="bg-gray-100 p-2 rounded-xl w-full">
              {/* <p className="text-sm">{comment.content}</p> */}
              <p className="font-semibold text-sm">{comment.userName}</p>
              <p className="text-sm">{comment.content}</p>

              <div className="flex space-x-2 mt-1 text-xs">
                <button
                  className={`cursor-pointer ${
                    comment.likes?.includes(user._id)
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleCommentLike(comment._id)}
                >
                  Like ({comment.likes?.length || 0})
                </button>
                <button
                  className="text-gray-500 cursor-pointer"
                  onClick={() =>
                    setReplyInputs({ ...replyInputs, [comment._id]: "" })
                  }
                >
                  Reply
                </button>
              </div>
            </div>
          </div>

          {/* Reply Input */}
          {/* Reply Input */}
          {replyInputs[comment._id] !== undefined && (
            <div className="flex flex-col mt-1 ml-8">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  placeholder="Write a reply..."
                  value={
                    replyInputs[comment._id] || `@${comment.userName} ` // pre-fill with username if empty
                  }
                  onChange={(e) => {
                    // ensure the username stays at the start
                    const inputValue = e.target.value;
                    if (!inputValue.startsWith(`@${comment.userName} `)) {
                      setReplyInputs({
                        ...replyInputs,
                        [comment._id]: `@${comment.userName} `,
                      });
                    } else {
                      setReplyInputs({
                        ...replyInputs,
                        [comment._id]: inputValue,
                      });
                    }
                  }}
                />
                <button
                  className="text-blue-500 font-semibold text-sm cursor-pointer"
                  onClick={() => handleReplySubmit(comment._id)}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
