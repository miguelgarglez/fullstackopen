import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('enter title here')
  const inputAuthor = screen.getByPlaceholderText('enter author here')
  const inputUrl = screen.getByPlaceholderText('enter URL here')
  const sendButton = screen.getByText('Create')

  await user.type(inputTitle, 'testing title...')
  await user.type(inputAuthor, 'testing author...')
  await user.type(inputUrl, 'testing url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url...')
})
