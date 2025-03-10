import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

interface PostData {
  posts: Post[];
}

const fetchPostList = async () => {
  return await axios.get<PostData>("/post");
};

const PostSkeleton = () => {
  return (
    <div className="group relative">
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>
      <div className="mt-4 flex justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const Post = () => {
  const getPostList = useQuery({
    queryKey: ["postList"],
    queryFn: fetchPostList,
  });
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4">
    <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => navigate("./add")}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
      </svg>
    </button>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List of Posts
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {getPostList.isFetching
              ? Array.from({ length: 4 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              : getPostList.data?.data.posts.map((post) => (
                  <div
                key={post.id}
                className="group relative cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {post.body.substring(0, 100)}...
                  </p>
                  <div className="mt-3">
                    <span className="text-sm text-gray-600 mr-3">
                      👍 {post.reactions.likes}
                    </span>
                    <span className="text-sm text-gray-600 mr-3">
                      👎 {post.reactions.dislikes}
                    </span>
                    <span className="text-sm text-gray-600">
                      👁️ {post.views}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Tags: {post.tags.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    User ID: {post.userId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;