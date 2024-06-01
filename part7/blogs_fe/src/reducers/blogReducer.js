import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      console.log(current(state))
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    eraseBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, updateBlog, setBlogs, eraseBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch(eraseBlog(blog.id))
    }
  }
}

export const likeBlog = (id, blogToChange) => {
  return async (dispatch) => {
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    await blogService.update(id, changedBlog)
    dispatch(updateBlog(id))
  }
}

export default blogSlice.reducer
