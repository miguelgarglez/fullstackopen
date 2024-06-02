import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { clearUser, initializeUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router-dom'
import User from './components/User'
import Menu from './components/Menu'
import { Container, Row, Col } from 'react-bootstrap'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  const user = useSelector((state) => state.user)

  return (
    <div>
      {user && (
        <>
          <Menu user={user} handleLogout={handleLogout} />
          <Notification />
          <Container style={{ marginTop: '20px' }}>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/create" element={<BlogForm />} />
            </Routes>
          </Container>
        </>
      )}
      {!user && (
        <div>
          <h2 style={{ marginTop: '20px' }}>Login to blog app</h2>
          <LoginForm />
        </div>
      )}
      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e7e7e7',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Row>
        <Col className="text-center py-3">
          Blog app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
          See{' '}
          <a href="https://github.com/miguelgarglez/fullstackopen/part7/blogs_fe">
            GitHub Repository
          </a>{' '}
          for the source code.
        </Col>
      </Row>
    </Container>
  )
}

export default App
