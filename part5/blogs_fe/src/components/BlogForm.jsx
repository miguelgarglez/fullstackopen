import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="newBlogTitle">Title:</label>
        <input
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={(event) => {
            setNewBlogTitle(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author:</label>
        <input
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={(event) => {
            setNewBlogAuthor(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="newBlogUrl">URL:</label>
        <input
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={(event) => {
            setNewBlogUrl(event.target.value);
          }}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
