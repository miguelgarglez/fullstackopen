import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
      })
    )
    dispatch(
      setNotification({
        message: `You created '${event.target.title.value}'`,
        seconds: 5,
      })
    )
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <form id="blog-form" onSubmit={addBlog}>
      <div>
        <label htmlFor="newBlogTitle">Title:</label>
        <input id="newBlogTitle" name="title" placeholder="enter title here" />
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author:</label>
        <input
          id="newBlogAuthor"
          name="author"
          placeholder="enter author here"
        />
      </div>
      <div>
        <label htmlFor="newBlogUrl">URL:</label>
        <input id="newBlogUrl" name="url" placeholder="enter URL here" />
      </div>
      <button id="create-blog" type="submit">
        Create
      </button>
    </form>
  )
}

export default BlogForm
