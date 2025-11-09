const express = require("express");
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const { upload } = require("../middleware/uploadMiddleware");


// GET all blogs
router.get("/", getBlogs);

// GET single blog by slug
router.get("/:slug", getBlogBySlug);

// CREATE blog
router.post("/",upload.single("image"), createBlog); // ✅ This is required

// UPDATE blog
router.put("/:id", updateBlog);

// DELETE blog
router.delete("/:id", deleteBlog);

module.exports = router;
