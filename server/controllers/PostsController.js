
const PostsService = require('../services/PostsService')

class PostsController {
    async create(req, res) {
        try {
            console.log(req.body)
            const savedPost = await PostsService.create(req.body)
            res.send(savedPost)
        } catch (err) {
            res.json({message: err}, res.sendStatus(400))
        }
    }

    async getAll(req, res) {
        try {
            const pageSize = +req.query.pageSize
            const page = +req.query.page
            const posts = await PostsService.getAll(pageSize, page)
            console.log(posts)
            res.json(posts)
        } catch (err) {
            res.json(err)
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostsService.getOne(req.params.id)
            res.json(post)
        } catch (err) {
            res.json(err)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostsService.update(req.body)
            return res.json(updatedPost)
        } catch (err) {
            res.json(err)
        }
    }
    async setPostView(req, res) {
        try {
            const updatedPost = await PostsService.setPostView(req.params.id)
            return res.json(updatedPost)
        } catch (err) {
            res.json(err)
        }
    }

    async delete(req, res) {
        try {
            const posts = await PostsService.delete(req.params.id)
            res.json(posts)
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = new PostsController()