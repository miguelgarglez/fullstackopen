import { useState } from "react";

const Blog = ({ blog }) => {
  const [visibleDetails, setVisibleDetails] = useState(false);

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
            likes: {blog.likes} <button>like</button>
          </div>
          {blog.user ? <div>{blog.user.name}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Blog;
