import HomeList from "@/components/HomeList";
import { apiPlaceholder } from "@/configs/api";
import PostRepository from "@/repositories/modules/post";
import { IPost } from "@/types/modules/post";
import { createSsrInstance } from "@/utils/axios";
import { NextPage } from "next";
import { cookies } from "next/headers";

interface HomeProps {
  posts: IPost[];
}

const Home: NextPage<HomeProps> = async () => {
  const cookieStore = await cookies();
  const postsRepo = new PostRepository(
    createSsrInstance(apiPlaceholder, cookieStore)
  );
  const res = await postsRepo.getPosts();
  const posts = res.data ?? [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Server Side Posts</h2>
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

        <div>
          <h2 className="text-xl font-bold mb-4">Client Side Posts</h2>
          <HomeList />
        </div>
      </div>
    </div>
  );
};

export default Home;
