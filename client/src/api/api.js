import * as axios from "axios";
const instance = axios.create({
  baseURL: process.env.BASEURL || "https://forumintelligent.herokuapp.com/api",
  // baseURL: process.env.BASEURL || "http://localhost:5000/api",
});
export const usersAPI = {
  getUsers(page, search, sort) {
    return instance.get(`/users?page=${page}&search=${search}&sort=${sort}`);
  },
  getUser(id) {
    return instance.get("/users/" + id);
  },
  addUser(newUser) {
    return instance.post("/users", newUser);
  },
  updateUser(user) {
    return instance.put(`/users`, user);
  },
  deleteUser(id) {
    return instance.delete(`/users/` + id);
  },
};
export const postsAPI = {
  getPosts(pageSize, page, sort, search, unanswered) {
    const params = new URL(window.location.href).searchParams;

    return instance.get(
      `/posts?pageSize=${pageSize}&page=${page}&sortType=${sort}&unanswered=${unanswered}&tags=${params.get(
        "tags"
      )}&searchValue=${search}`
    );
  },
  getPost(id) {
    return instance.get("/posts/" + id);
  },
  getLastUserPosts(userId) {
    return instance.get("/posts/userPosts/" + userId);
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
  deletePost(id) {
    return instance.delete(`/posts/` + id);
  },
};
export const answersAPI = {
  addAnswer(answer) {
    return instance.post("/answers", answer);
  },
  getAnswers(postId, page) {
    return instance.get(`/answers/${postId}?page=${page}`);
  },
  getUserTopAnswers(userId, page) {
    return instance.get(`/answers/userTopAnswers/${userId}?page=${page}`);
  },
  getAnswer(answerId) {
    return instance.get(`/answers/id/${answerId}`);
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
  getComment(commentId) {
    return instance.get(`/comments/id/${commentId}`);
  },
  deleteComment(commentId) {
    return instance.delete(`/comments/${commentId}`);
  },
};
export const tagsApi = {
  addTags(tags) {
    return instance.post("/tags", { tags });
  },
  getTagCount(tag) {
    return instance.get("/tags/" + tag);
  },
};
export const userTagsApi = {
  addUserTags(tags, userId) {
    return instance.post("/userTags", { tags, userId });
  },
  getTagCount(tag) {
    return instance.get("/userTags/" + tag);
  },
  getUserTags(userId) {
    return instance.get("/userTags/" + userId);
  },
};
export const messagesApi = {
  addMessage(type, mainUser, userId, messageId) {
    return instance.post("/messages", { type, mainUser, userId, messageId });
  },
  getMessages(userId) {
    return instance.get("/messages/" + userId);
  },
  updateMessage(message) {
    return instance.put("/messages", message);
  },
};
