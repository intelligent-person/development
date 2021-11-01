import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/'
})

export const usersAPI = {
    getUsers() {
        return instance.get('/users')
    },
    getUser(sub) {
        return instance.get('/users/' + sub)
    },
    addUser(name, picture, reputation, email, sub, status) {
        return instance.post('/users', {name, picture, reputation, email, sub, status})
    },
    delUser(id) {
        return instance.delete(`/users/` + id)
    },
}
export const postsAPI = {
    getPosts(pageSize, page) {
        return instance.get(`/posts?pageSize=${pageSize}&page=${page}`)
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
    delPost(id) {
        return instance.delete(`/posts/` + id)
    },
}