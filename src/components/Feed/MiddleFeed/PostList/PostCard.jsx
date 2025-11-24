import { useState } from "react";
import AvatarImg from "../../../../assets/images/Avatar.png";
import CommentList from "./CommentList";
import AddCommentBox from "./AddCommentBox";
import axios from "axios";

const PostCard = ({ post, user, posts, setPosts }) => {
  const BACKEND_URL = "http://localhost:5000";
  const [commentInputs, setCommentInputs] = useState("");

  const toggleLikePost = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts(
        posts.map((p) => (p._id === post._id ? { ...p, likes: res.data } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSharePost = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/posts/${post._id}/share`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts([res.data, ...posts]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center space-x-3 mb-3">
        <img src={AvatarImg} className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold">{post.posterName || "Unknown"}</h4>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mb-3">{post.content}</p>
      {post.image && (
        <img src={post.image} className="rounded-xl w-full mb-3" alt="post" />
      )}
{/* Likes summary */}
{post.likes?.length > 0 && post.likeUsers?.length > 0 && (
  <div className="mb-2 text-sm text-gray-500">
    {post.likes.length === 1 ? (
      // Only one like → show the name
      <span className="font-semibold text-blue-500">
        {post.likeUsers[0].firstname} {post.likeUsers[0].lastname} liked this
      </span>
    ) : (
      // Multiple likes → show first name + "and N others"
      <>
        <span className="font-semibold text-blue-500">
          {post.likeUsers[0].firstname} {post.likeUsers[0].lastname}
        </span>{" "}
        and {post.likes.length - 1} {post.likes.length - 1 === 1 ? "other" : "others"} liked this
      </>
    )}
  </div>
)}


      <div className="flex items-center space-x-4 mb-3">
        <button
          onClick={toggleLikePost}
          className={`text-sm cursor-pointer ${
            post.likes?.includes(user._id) ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Like ({post.likes?.length || 0})
        </button>
        <span className="text-sm text-gray-500">
          {post.comments?.length || 0} Comment
        </span>
        <button
          onClick={handleSharePost}
          className="cursor-pointer text-sm text-gray-500"
        >
          Share
        </button>
      </div>

      <CommentList post={post} user={user} posts={posts} setPosts={setPosts} />
      <AddCommentBox
        post={post}
        user={user}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  );
};

export default PostCard;
