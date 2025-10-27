import HomeList from "@/components/HomeList";
import PostRepository from "@/repositories/modules/post";
import { initServerRepo } from "@/utils/repository";

const Home = async () => {
  const postsRepo = await initServerRepo(PostRepository);
  const res = await postsRepo.getPosts();
  const posts = res.data ?? [];

  const serverPost = async () => {
    "use server";

    const postsRepo = await initServerRepo(PostRepository);
    await postsRepo.createPost({
      body: { body: "abcd", title: "asdasd", userId: 1 },
    });
  };

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Server Side Posts</h2>
          <button onClick={serverPost}>Server Post</button>
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
