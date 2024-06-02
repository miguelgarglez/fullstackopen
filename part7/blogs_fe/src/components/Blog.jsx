import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const Blog = () => {
  const currentLoggedInUser = window.localStorage.getItem('loggedBlogappUser')
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')

  const blogs = useSelector((state) => state.blogs)
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) {
    return null
  }
  const handleLike = async () => {
    dispatch(likeBlog(blog.id, blog))
    dispatch(
      setNotification({
        message: `You liked '${blog.title}'`,
        seconds: 5,
      })
    )
  }

  const handleRemove = async () => {
    dispatch(deleteBlog(blog))
    dispatch(
      setNotification({
        message: `You removed '${blog.title}'`,
        seconds: 5,
      })
    )
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes: {blog.likes} <Button onClick={handleLike}>like</Button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      {blog.user &&
      currentLoggedInUser &&
      blog.user.id === currentLoggedInUser.id ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : null}
      <Comments blog={blog} />
    </div>
  )
}

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(blog.id, comment))
    dispatch(
      setNotification({
        message: `You added a comment '${comment}'`,
        seconds: 5,
      })
    )
    event.target.comment.value = ''
  }

  return (
    <div>
      <h3>Comments</h3>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <Form onSubmit={addComment}>
        <Form.Control name="comment" />
        <Button type="submit">add comment</Button>
      </Form>
    </div>
  )
}

export default Blog
