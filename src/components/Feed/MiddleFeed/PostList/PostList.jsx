import PostCard from "./PostCard";

const PostList = ({ posts, setPosts, user }) => {
  return (
    <div className="mt-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} posts={posts} setPosts={setPosts} user={user} />
      ))}
    </div>
  );
};

export default PostList;
