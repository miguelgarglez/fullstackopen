import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <form id="blog-form" onSubmit={addBlog}>
      <div>
        <label htmlFor="newBlogTitle">Title:</label>
        <input
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={(event) => {
            setNewBlogTitle(event.target.value)
          }}
          placeholder="enter title here"
        />
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author:</label>
        <input
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={(event) => {
            setNewBlogAuthor(event.target.value)
          }}
          placeholder="enter author here"
        />
      </div>
      <div>
        <label htmlFor="newBlogUrl">URL:</label>
        <input
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={(event) => {
            setNewBlogUrl(event.target.value)
          }}
          placeholder="enter URL here"
        />
      </div>
      <button id="create-blog" type="submit">
        Create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
