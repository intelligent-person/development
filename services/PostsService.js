const Post = require("../models/Post");
const { User } = require("../models/User");

class PostsService {
  async create(post) {
    const createdPost = await Post.create(post);
    await User.findOneAndUpdate(
      { sub: post.userId },
      { $inc: { questions: +1 } }
    );
    return createdPost;
  }

  async getAll(page, pageSize, sort, unanswered, tags, searsValue) {
    //SORT
    let sortable = { date: "desc" };
    if (sort === "lessViews") sortable = { views: "asc" };
    else if (sort === "moreViews") sortable = { views: "desc" };
    //FILTER
    let find = {};
    if (unanswered === "true" && tags !== "null")
      find = { answersCount: 0, tags: { $in: tags.split(",") } };
    else if (tags !== "null") find = { tags: { $in: tags.split(",") } };
    else if (unanswered === "true") find = { answersCount: 0 };
    if (searsValue !== "null") {
      if (tags === "null") {
        find = { $text: { $search: searsValue } };
        if (unanswered === "true")
          find = { $text: { $search: searsValue }, answersCount: 0 };
      } else {
        find = {
          $text: { $search: searsValue },
          tags: { $in: tags.split(",") },
        };
        if (unanswered === "true")
          find = {
            $text: { $search: searsValue },
            answersCount: 0,
            tags: { $in: tags.split(",") },
          };
      }
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

  async getLastUserPosts(userId) {
    if (!userId) {
      throw new Error("Не указан ID");
    }
    const posts = await Post.find({ userId }).sort({ date: "desc" }).limit(5);
    return posts;
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
    const postCount = await Post.findByIdAndUpdate(
      id,
      { views: post.views + 1 },
      { new: true }
    );
    return postCount;
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
