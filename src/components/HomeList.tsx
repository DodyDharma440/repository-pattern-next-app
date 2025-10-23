"use client";

import { useEffect, useState } from "react";
import { useRepositories } from "@/contexts";
import { IPost } from "@/types/modules/post";

const HomeList = () => {
  const api = useRepositories();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await api.post.getPosts();
      setPosts(res.data ?? []);
    };
    getPosts();
  }, [api.post]);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("body", "hello");
    formData.append("title", "title");
    formData.append("userId", "1");
    await api.post.createPost({
      body: formData as any,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          className="bg-white px-4 py-2 rounded-md text-black"
          onClick={handlePost}
        >
          Post Data
        </button>
        <button className="bg-white px-4 py-2 rounded-md text-black">
          Patch Data
        </button>
        <button className="bg-white px-4 py-2 rounded-md text-black">
          Delete Data
        </button>
      </div>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={post.id}>
              {index + 1}. {post.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomeList;
