import * as axios from "axios";
import {setTagCount} from "../Redux/posts-reducer";
const baseUrl = process.env.BASE_URL
const instance = axios.create({
    baseURL: `http://localhost:5000/api/`
})
console.log(baseUrl)
export const usersAPI = {
    getUsers() {
        return instance.get('/users')
    },
    getUser(sub) {
        return instance.get('/users/' + sub)
    },
    addUser(newUser) {
        return instance.post('/users', newUser)
    },
    deleteUser(id) {
        return instance.delete(`/users/` + id)
    },
}
export const postsAPI = {
    getPosts(pageSize, page, sort, include, searchValue) {
        return instance.get(`/posts?pageSize=${pageSize}&page=${page}&sortType=${sort}&unanswered=${include.unanswered}&tags=${include.tags}&searchValue=${searchValue}`)
    },
    getPost(id) {
        return instance.get('/posts/' + id)
    },
    addPost(newPost) {
        return instance.post('/posts', newPost)
    },
    update(post) {
      return instance.put('/posts', post)
    },
    setPostView(id) {
      return instance.put('/posts/setPostView/' + id)
    },
    getTagCount(tag) {
      return instance.get('/posts/tagCount/' + tag)
    },
    deletePost(id) {
        return instance.delete(`/posts/` + id)
    },
}