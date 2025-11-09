const Blog = require("../models/Blog");
const slugify = require("slugify");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
};

exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ where: { slug: req.params.slug } });
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  const { title, excerpt, content, category } = req.body;
  let imagePath = "";

  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`; // save path to DB
  }  const slug = slugify(title, { lower: true });

  const blog = await Blog.create({ title, excerpt, content, category, image: imagePath, slug, });
  res.status(201).json(blog);
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const [updated] = await Blog.update(req.body, { where: { id } });
  if (!updated) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog updated" });
};

exports.deleteBlog = async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  res.json({ message: "Blog deleted" });
};
