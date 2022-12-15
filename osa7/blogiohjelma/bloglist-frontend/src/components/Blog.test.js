/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'testioskari',
      author: 'testimarkus',
      url: 'www.chrisurl.ee',
      likes: 1,
      user: {
        username: 'kayttaja',
        name: 'kayttaja',
      },
    }
    const userLoggedIn = {
      username: 'kayttaja',
      name: 'kayttaja',
    }
    window.localStorage.setItem(
      'loggedNoteappUser',
      JSON.stringify(userLoggedIn)
    )
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Blog blog={blog} handleLike={mockHandler} />)
  })

  test('renders title', () => {
    const title = screen.getByText(/testioskari/)
    const author = screen.getByText(/testimarkus/)
    const url = screen.getByText(/chrisurl/)
    const likes = screen.getByText(/1/)
  })

  test('when like button is clicked twice, event handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText(/view/)
    await user.click(viewButton)
    // eslint-disable-next-line testing-library/no-debugging-utils

    const likeButton = screen.getByText(/^like$/)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
