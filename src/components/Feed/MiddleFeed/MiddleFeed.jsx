import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import CreatePostBox from "./CreatePostBox";
import StoriesSection from "./StoriesSection";
import PostList from "./PostList/PostList";

const MiddleFeed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const BACKEND_URL = "http://localhost:5000";
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/posts`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // fetch comments for each post
        const postsWithComments = await Promise.all(
          res.data.map(async (post) => {
            const commentsRes = await axios.get(
              `${BACKEND_URL}/api/comments/${post._id}`
            );
            return { ...post, comments: commentsRes.data };
          })
        );

        setPosts(postsWithComments);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.token) fetchPosts();
  }, [user]);

  return (
    <>
      <StoriesSection />
      <CreatePostBox user={user} setPosts={setPosts} posts={posts} />
      <PostList user={user} posts={posts} setPosts={setPosts} />
    </>
  );
};

export default MiddleFeed;
