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

  return (
    <div>
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
