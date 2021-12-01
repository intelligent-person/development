import * as axios from "axios";
const baseUrl = process.env.BASE_URL;
const instance = axios.create({
  baseURL: `http://localhost:5000/api/`,
});
export const usersAPI = {
  getUsers() {
    return instance.get("/users");
  },
  getUser(id) {
    return instance.get("/users/" + id);
  },
  addUser(newUser) {
    return instance.post("/users", newUser);
  },
  deleteUser(id) {
    return instance.delete(`/users/` + id);
  },
};
export const postsAPI = {
  getPosts(pageSize, page, sort, include, searchValue) {
    return instance.get(
      `/posts?pageSize=${pageSize}&page=${page}&sortType=${sort}&unanswered=${include.unanswered}&tags=${include.tags}&searchValue=${searchValue}`
    );
  },
  getPost(id) {
    return instance.get("/posts/" + id);
  },
  addPost(newPost) {
    return instance.post("/posts", newPost);
  },
  update(post) {
    return instance.put("/posts", post);
  },
  setPostView(id) {
    return instance.put("/posts/setPostView/" + id);
  },
  getTagCount(tag) {
    return instance.get("/posts/tagCount/" + tag);
  },
  deletePost(id) {
    return instance.delete(`/posts/` + id);
  },
};
export const answersAPI = {
  addAnswer(answer) {
    return instance.post("/answers", answer);
  },
  getAnswers(postId) {
    return instance.get("/answers/" + postId);
  },
  updateAnswer(answer) {
    return instance.put("/answers", answer);
  },
  deleteAnswer(params) {
    return instance.delete(`/answers/${params.id}/${params.postId}`);
  },
};
export const commentsAPI = {
  addComment(comment) {
    return instance.post("/comments", comment);
  },
  getComments(answerId, page) {
    return instance.get(`/comments/${answerId}?page=${page}`);
  },
  deleteComment(commentId) {
    return instance.delete(`/comments/${commentId}`);
  },
};
