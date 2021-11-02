const Post = require('../models/Post')

class PostsService {
    async create(post) {
        const createdPost = await Post.create(post)
        return createdPost
    }

    async getAll(pageSize, page, sort, include) {
        const postsCount = await Post.count()
        if(sort === 'lessViews') {
            const posts = await Post
                .find({})
                .select('title body user tags views answersCount date')
                .sort({
                    views: 'asc'
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            return [posts, postsCount]
        } else if (sort === 'moreViews') {
            const posts = await Post
                .find({})
                .select('title body user tags views answersCount date')
                .sort({
                    views: 'desc'
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            return [posts, postsCount]
        } else {
            const posts = await Post
                .find({})
                .select('title body user tags views answersCount date')
                .sort({
                    date: 'desc'
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            return [posts, postsCount]
        }
    }

    async getOne(id) {
        if(!id) {
            throw new Error('Не указан ID')
        }
        const post = await Post.findById(id)
        return post
    }

    async update(post) {
        if (!post._id) {
            throw new Error('Не указан ID')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost
    }

    async setPostView(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const post = await Post.findById(id)
        await Post.findByIdAndUpdate(id, {views: post.views + 1}, {new: true})
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        await Post.findByIdAndDelete(id)
        const posts = await Post.find()
        return posts
    }
}

module.exports = new PostsService()