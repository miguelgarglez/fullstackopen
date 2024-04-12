import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails);
  };

  const updateBlog = async () => {
    console.log("like");
    const updatedBlog = await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id,
    });
    if (updatedBlog) {
      setLikes(updatedBlog.likes);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{" "}
        <button onClick={toggleVisibility}>
          {visibleDetails ? "hide" : "view"}
        </button>
        <div style={{ display: visibleDetails ? "" : "none" }}>
          <div>{blog.url}</div>
          <div>
            likes: {likes} <button onClick={updateBlog}>like</button>
          </div>
          {blog.user ? <div>{blog.user.name}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Blog;
