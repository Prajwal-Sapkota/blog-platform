import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";

export const blogs = [
  {
    id: 1,
    slug: "my-first-blog-post",
    title: "My First Blog Post",
    excerpt: "This is a short summary of my first blog post.",
    content: `
      <p>Welcome to my first blog post! This is where I share my thoughts and experiences.</p>
      <p>React and Tailwind make building UIs super easy and fun.</p>
    `,
    image: blog1,
    date: "2025-10-31",
    category: "React",
    tags: ["React", "Tailwind"],
  },
  {
    id: 2,
    slug: "another-blog-post",
    title: "Another Blog Post",
    excerpt: "This is a short summary of another post.",
    content: `
      <p>This is another blog post to demonstrate dynamic routing in React.</p>
      <p>You can click a blog card and view its details on a separate page.</p>
    `,
    image: blog2,
    date: "2025-10-30",
    category: "JavaScript",
    tags: ["JS", "Routing"],
  },
];
