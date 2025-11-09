// backend/models/Comment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Blog = require("./Blog");

const Comment = sequelize.define("Comment", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define relation (each comment belongs to a specific blog)
Blog.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Blog);

module.exports = Comment;
