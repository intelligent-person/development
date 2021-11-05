const PostsService = require("../services/PostsService");

class PostsController {
  async create(req, res) {
    try {
      const savedPost = await PostsService.create(req.body);
      res.send(savedPost);
    } catch (err) {
      res.json({ message: err }, res.sendStatus(400));
    }
  }

  async getAll(req, res) {
    try {
      const pageSize = +req.query.pageSize;
      const page = +req.query.page;
      const sort = req.query.sortType;
      const unanswered = req.query.unanswered;
      const tags = req.query.tags.split(",");
      const searchValue = req.query.searchValue;
      console.log(searchValue);
      console.log(sort);
      const posts = await PostsService.getAll(
        pageSize,
        page,
        sort,
        unanswered,
        tags,
        searchValue
      );
      res.json(posts);
    } catch (err) {
      res.json(err);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostsService.getOne(req.params.id);
      res.json(post);
    } catch (err) {
      res.json(err);
    }
  }
  async getTagCount(req, res) {
    try {
      const tagCount = await PostsService.getTagCount(req.params.tag);
      res.json(tagCount);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostsService.update(req.body);
      return res.json(updatedPost);
    } catch (err) {
      res.json(err);
    }
  }
  async setPostView(req, res) {
    try {
      const updatedPost = await PostsService.setPostView(req.params.id);
      return res.json(updatedPost);
    } catch (err) {
      res.json(err);
    }
  }

  async delete(req, res) {
    try {
      const posts = await PostsService.delete(req.params.id);
      res.json(posts);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new PostsController();
