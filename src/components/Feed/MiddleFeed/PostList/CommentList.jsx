import { useState } from "react";
import AvatarImg from "../../../../assets/images/Avatar.png";
import axios from "axios";

const CommentList = ({
  post,
  user,
  posts,
  setPosts,
  setReplyingTo,
  setReplyUsername,
}) => {
  const BACKEND_URL = "http://localhost:5000";
  const [visibleCount, setVisibleCount] = useState(2); // show first 2 top-level comments

  const buildCommentTree = (comments = []) => {
    const map = {};

    comments.forEach((c) => {
      map[c._id] = { ...c, replies: [], parentUserName: null };
    });

    const roots = [];

    comments.forEach((c) => {
      if (c.parentCommentId) {
        const parent = map[c.parentCommentId];
        if (parent) {
          map[c._id].parentUserName = parent.userName || null;
          parent.replies.push(map[c._id]);
        } else {
          roots.push(map[c._id]);
        }
      } else {
        roots.push(map[c._id]);
      }
    });

    return roots;
  };

  const commentTree = buildCommentTree(post.comments || []);

  const handleLike = async (commentId) => {
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

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const d = new Date(createdAt);
    const sec = Math.floor((now - d) / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    return `${day}d ago`;
  };

  const renderComment = (comment, level = 0) => {
    return (
      <div key={comment._id} className={`mb-4 ${level > 0 ? "ml-8" : ""}`}>
        <div className="flex items-start">
          <img src={AvatarImg} className="w-9 h-9 rounded-full mt-1" />

          <div className="ml-3 bg-gray-100 rounded-2xl px-4 py-3 w-full">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{comment.userName}</p>
              {comment.parentUserName && (
                <span className="text-xs text-gray-500 ml-1">
                  replying to{" "}
                  <span className="font-medium">{comment.parentUserName}</span>
                </span>
              )}
            </div>

            <p className="text-sm mt-1 whitespace-pre-wrap">
              {comment.content}
            </p>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
              <button
                onClick={() => handleLike(comment._id)}
                className={`cursor-pointer font-medium ${
                  comment.likes?.includes(user._id) ? "text-blue-500" : ""
                }`}
              >
                Like
              </button>

              <button
                onClick={() => {
                  setReplyingTo(comment._id);
                  setReplyUsername(comment.userName);
                }}
                className="cursor-pointer  font-medium"
              >
                Reply
              </button>

              <span className="text-gray-400">
                · {getTimeAgo(comment.createdAt)}
              </span>
            </div>

            {comment.likes?.length > 0 && (
              <div className="mt-2 inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <span>👍</span>
                <span className="text-sm font-semibold">
                  {comment.likes.length}
                </span>
              </div>
            )}
          </div>
        </div>
        {comment.replies?.length > 0 &&
          comment.replies.map((r) => renderComment(r, level + 1))}
      </div>
    );
  };

  return (
    <div className="mt-4">
      {commentTree.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet</p>
      ) : (
        <>
          {commentTree.slice(0, visibleCount).map((c) => renderComment(c))}

   
          {visibleCount < commentTree.length && (
            <button
              onClick={() => setVisibleCount((v) => v + 5)}
              className="cursor-pointer text-sm font-semibold text-gray-700 mt-2"
            >
              View more comments ({commentTree.length - visibleCount} more)
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;
