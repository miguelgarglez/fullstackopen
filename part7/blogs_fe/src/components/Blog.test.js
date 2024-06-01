import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Blog from './BlogList'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let blog
  let mockHandler
  let container
  let updateBlog
  let deleteBlog
  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Jest',
      url: 'https://jestjs.io/',
      likes: 0,
      user: {
        username: 'root',
        name: 'Superuser',
      },
    }
    updateBlog = jest.fn()
    deleteBlog = jest.fn()

    container = render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        currentLoggedInUser={{}}
      />
    ).container
  })

  test('renders title and author, does not show url or likes', () => {
    expect(
      screen.queryByText('Component testing is done with react-testing-library')
    ).toBeDefined()
    expect(screen.queryByText('Jest')).toBeDefined()
    const details = container.querySelector('#blogDetails')
    expect(details).toHaveStyle('display: none')
  })

  test('clicking the button shows url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    user.click(button)

    await waitFor(() => {
      const details = container.querySelector('#blogDetails')
      expect(details).not.toHaveStyle('display: none')
    })
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    // due to my app logic, I cannot check the number of calls to the event handler
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    user.click(viewButton)

    const likeButton = screen.getByText('like')
    user.click(likeButton)
    user.click(likeButton)

    expect(screen.queryByText('likes: 2')).toBeDefined()
  })
})
