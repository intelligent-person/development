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
export const authAPI = {
  getAuth(sub) {
    return instance.get("/auth/" + sub);
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
};
