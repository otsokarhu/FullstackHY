/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'


test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {

    const addBlog = jest.fn()


    const testUser = {
        username: 'oskari',
        name: 'oskari'
    }

    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(testUser))

    const { container } = render(<AddBlogForm createBlog={addBlog} />)

    const user = userEvent.setup()


    const title = container.querySelector('#title-input')
    const author = container.querySelector('#author-input')
    const url = container.querySelector('#url-input')
    const createB = container.querySelector('#create-button')

    await user.type(title, 'john deere or massey ferguson')
    await user.type(author, 'oskari')
    await user.type(url, 'www.ainoastaanmasseyferguson.ee')
    await user.click(createB)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('john deere or massey ferguson')
    expect(addBlog.mock.calls[0][0].author).toBe('oskari')
    expect(addBlog.mock.calls[0][0].url).toBe('www.ainoastaanmasseyferguson.ee')
})