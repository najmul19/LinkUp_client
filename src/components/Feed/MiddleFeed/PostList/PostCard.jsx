import { useState } from "react";
import AvatarImg from "../../../../assets/images/Avatar.png";
import CommentList from "./CommentList";
import AddCommentBox from "./AddCommentBox";
import axios from "axios";
import LikeModal from "../../../Shared/components/LikeModal";
import PostOptionsMenu from "../../../Shared/components/PostOptionsMenu";

// Helper function to calculate "time ago"
const timeAgo = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diff = Math.floor((now - postDate) / 1000); // difference in seconds

  if (diff < 60) return `${diff} sec${diff === 1 ? "" : "s"} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min${
      Math.floor(diff / 60) === 1 ? "" : "s"
    } ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${
      Math.floor(diff / 3600) === 1 ? "" : "s"
    } ago`;
  return `${Math.floor(diff / 86400)} day${
    Math.floor(diff / 86400) === 1 ? "" : "s"
  } ago`;
};

const PostCard = ({ post, user, posts, setPosts }) => {
  const BACKEND_URL = "http://localhost:5000";

  const [showLikesModal, setShowLikesModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyUsername, setReplyUsername] = useState(null);

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.filter((p) => p._id !== post._id));
      setOpenMenu(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLikePost = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? { ...p, likes: res.data.likes, likeUsers: res.data.likeUsers }
            : p
        )
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
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {/* HEADER */}
      <div className="flex items-center space-x-3 mb-3">
        <img src={AvatarImg} className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <h4 className="font-semibold">{post.posterName || "Unknown"}</h4>
          <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
        </div>
        <div className="relative ml-auto">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="cursor-pointer text-gray-600 hover:text-black text-xl font-bold"
          >
            ⋮
          </button>
          {openMenu && (
            <PostOptionsMenu
              onEdit={() => console.log("editing...")}
              onDelete={handleDeletePost}
            />
          )}
        </div>
      </div>

      {/* CONTENT */}
      <p className="mb-3 text-[15px] leading-snug">{post.content}</p>
      {post.image && (
        <img src={post.image} className="rounded-xl w-full mb-3" alt="post" />
      )}

    
      {post.likes?.length > 0 && (
        <div
          className="mb-2 text-sm text-gray-500 cursor-pointer hover:text-blue-600"
          onClick={() => setShowLikesModal(true)}
        >
          {post.likeUsers?.length > 0 ? (
            post.likes.length === 1 ? (
              <span className="font-semibold text-blue-500">
                {post.likeUsers[0]?.firstname} {post.likeUsers[0]?.lastname}{" "}
                liked this
              </span>
            ) : (
              <>
                <span className="font-semibold text-blue-500">
                  {post.likeUsers[0]?.firstname} {post.likeUsers[0]?.lastname}
                </span>{" "}
                and {post.likes.length - 1}{" "}
                {post.likes.length - 1 === 1 ? "other" : "others"} liked this
              </>
            )
          ) : (
            <span>
              {post.likes.length} like{post.likes.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* action */}
      <div className="flex items-center justify-start space-x-6 mb-3 text-sm">
        <button
          onClick={toggleLikePost}
          className={`cursor-pointer font-medium ${
            post.likes?.includes(user._id) ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Like
        </button>
        <button
          onClick={() => setShowLikesModal(true)}
          className="cursor-pointer text-blue-500"
        >
          ({post.likes?.length || 0})
        </button>
        <span className="text-gray-500">
          {post.comments?.length || 0} Comment
        </span>
        <button
          onClick={handleSharePost}
          className="cursor-pointer text-gray-500"
        >
          Share
        </button>
      </div>

      {/* coments */}
      <CommentList
        post={post}
        user={user}
        posts={posts}
        setPosts={setPosts}
        setReplyingTo={setReplyingTo}
        setReplyUsername={setReplyUsername}
      />
      <AddCommentBox
        post={post}
        user={user}
        posts={posts}
        setPosts={setPosts}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        replyUsername={replyUsername}
      />

      <LikeModal
        show={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        users={post.likeUsers}
      />
    </div>
  );
};

export default PostCard;
