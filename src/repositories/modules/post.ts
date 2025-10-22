import { Detail, FetchPromise, Store, Update } from "@/types/api";
import FetchFactory from "../factory";
import { IPost, IPostComment, IPostPayload } from "@/types/modules/post";

interface IPostRepository {
  getPosts(): FetchPromise<IPost[]>;
  getPost(params: Detail<"postId">): FetchPromise<IPost>;
  getPostComments(params: Detail<"postId">): FetchPromise<IPostComment[]>;
  createPost(params: Store<IPostPayload>): FetchPromise<IPost>;
  updatePost(params: Update<"postId", IPostPayload>): FetchPromise<IPost>;
  deletePost(params: Detail<"postId">): FetchPromise<IPost>;
}

class PostRepository extends FetchFactory implements IPostRepository {
  getPosts(): FetchPromise<IPost[]> {
    return this.call("/posts");
  }
  getPost({ params }: Detail<"postId">): FetchPromise<IPost> {
    return this.call(`/posts/${params.postId}`);
  }
  getPostComments({ params }: Detail<"postId">): FetchPromise<IPostComment[]> {
    return this.call(`/posts/${params.postId}/comments`);
  }
  createPost({ body }: Store<IPostPayload>): FetchPromise<IPost> {
    return this.call(`/posts`, { method: "POST", data: body });
  }
  updatePost({
    body,
    params,
  }: Update<"postId", IPostPayload>): FetchPromise<IPost> {
    return this.call(`/posts/${params.postId}`, {
      method: "PATCH",
      data: body,
    });
  }
  deletePost({ params }: Detail<"postId">): FetchPromise<IPost> {
    return this.call(`/posts/${params.postId}`, {
      method: "DELETE",
    });
  }
}

export default PostRepository;
