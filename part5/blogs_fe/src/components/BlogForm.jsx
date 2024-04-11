const BlogForm = ({
  addBlog,
  handleBlogAuthorChange,
  handleBlogTitleChange,
  handleBlogUrlChange,
  newBlogAuthor,
  newBlogTitle,
  newBlogUrl,
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="newBlogTitle">Title:</label>
        <input
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author:</label>
        <input
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        <label htmlFor="newBlogUrl">URL:</label>
        <input
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
