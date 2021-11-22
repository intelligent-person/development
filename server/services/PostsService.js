const Post = require("../models/Post");

class PostsService {
  async create(post) {
    console.log(post);
    const createdPost = await Post.create(post);
    return createdPost;
  }

  async getAll(pageSize, page, sort, unanswered, tags, searsValue) {
    //SORT
    let sortable = { date: "desc" };
    if (sort === "lessViews") sortable = { views: "asc" };
    else if (sort === "moreViews") sortable = { views: "desc" };
    //FILTER
    let find = {};
    if (unanswered === "true" && tags[0] !== "undefined")
      find = { answersCount: 0, tags: { $in: tags } };
    else if (tags[0] !== "undefined") find = { tags: { $in: tags } };
    else if (unanswered === "true") find = { answersCount: 0 };
    if (searsValue !== "") {
      find = { $text: { $search: searsValue } };
      if (unanswered === "true")
        find = { $text: { $search: searsValue }, answersCount: 0 };
    }
    //POSTS COUNT
    const postsCount = await Post.find(find).count();
    //POSTS
    const posts = await Post.find(find)
      .select("-answers")
      .sort(sortable)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return [posts, postsCount];
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const post = await Post.findById(id);
    return post;
  }
  async getTagCount(tag) {
    if (!tag) {
      throw new Error("Не указан Tag");
    }
    const tagCount = await Post.find({ tags: { $in: tag } }).count();
    return tagCount;
  }

  async update(post) {
    if (!post._id) {
      throw new Error("Не указан ID");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async setPostView(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const post = await Post.findById(id);
    await Post.findByIdAndUpdate(id, { views: post.views + 1 }, { new: true });
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    return posts;
  }
}

module.exports = new PostsService();
