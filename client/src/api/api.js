import * as axios from "axios";
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
    getPosts(pageSize, page, sort, include) {
        return instance.get(`/posts?pageSize=${pageSize}&page=${page}&sortType=${sort}`, {include})
    },
    getPost(id) {
        return instance.get('/posts/' + id)
    },
    addPost(title, body, codeLanguage, user, tags, views, answersCount) {
        return instance.post('/posts', {title, body, codeLanguage, user, tags, views, answersCount})
    },
    update(id) {
      return instance.put('/posts', id)
    },
    setPostView(id) {
      return instance.put('/posts/setPostView/' + id)
    },
    deletePost(id) {
        return instance.delete(`/posts/` + id)
    },
}