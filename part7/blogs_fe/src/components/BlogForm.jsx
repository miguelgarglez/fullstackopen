import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
      })
    )
    navigate('/')
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
    <Form id="blog-form" onSubmit={addBlog}>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label htmlFor="newBlogTitle">Title:</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title here" />
      </Form.Group>

      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label htmlFor="newBlogAuthor">Author:</Form.Label>
        <Form.Control
          id="newBlogAuthor"
          name="author"
          placeholder="Enter author here"
        />
      </Form.Group>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label htmlFor="newBlogUrl">URL:</Form.Label>
        <Form.Control id="newBlogUrl" name="url" placeholder="Enter URL here" />
      </Form.Group>
      <div style={{ marginTop: '20px' }}>
        <Button id="create-blog" type="submit">
          Create
        </Button>
      </div>
    </Form>
  )
}

export default BlogForm
