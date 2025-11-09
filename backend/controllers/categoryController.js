const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const exists = await Category.findOne({ where: { name } });
  if (exists) return res.status(400).json({ message: "Category exists" });
  const category = await Category.create({ name });
  res.status(201).json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.destroy({ where: { id: req.params.id } });
  res.json({ message: "Category deleted" });
};
