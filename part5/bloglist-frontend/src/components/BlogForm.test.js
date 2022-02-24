import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

describe('<BlogForm />', () => {

    test.only('The form calls the event handler when a new blog is created', () => {
        const createBlog = jest.fn()

        const component = render(
            <Togglable buttonLabel='new blog'>
                <BlogForm createBlog={createBlog} />
            </Togglable>
        )

        const newFormButton = component.container.querySelector('#newBlogButton')
        fireEvent.click(newFormButton)

        const inputTitle = component.container.querySelector('#title')
        const inputAuthor = component.container.querySelector('#author')
        const inputUrl = component.container.querySelector('#url')
        const blogForm = component.container.querySelector('form')

        fireEvent.change(inputTitle, {
            target: { value: 'TestBlog' }
        })
        fireEvent.change(inputAuthor, {
            target: { value: 'TestAuthor' }
        })
        fireEvent.change(inputUrl, {
            target: { value: 'http://testblog.com' }
        })

        fireEvent.submit(blogForm)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('TestBlog')
        expect(createBlog.mock.calls[0][0].author).toBe('TestAuthor')
        expect(createBlog.mock.calls[0][0].url).toBe('http://testblog.com')
    })
})