import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

    test('The component Blog displays only the title and author', () => {
        const user = {
            username: 'username1',
            name: 'user1',
            id: '2189AB'
        }

        const blog = {
            title: 'Test Programming',
            author: 'AuthorTest',
            url: 'http://testUrl.com',
            likes: 1,
            user: [user],
            id: '618ask18291289as'
        }

        const component = render(
            <Blog blog={blog} user={user.name}/>
        )

        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent(
            `${blog.title} ${blog.author}`
        )
        expect(div).not.toHaveTextContent(`${blog.url}`)
        expect(div).not.toHaveTextContent(`${blog.likes}`)
    })

    test('The blog\'s url and likes displayed when clicked details button', () => {
        const user = {
            username: 'username1',
            name: 'user1',
            id: '2189AB'
        }

        const blog = {
            title: 'Test Programming',
            author: 'AuthorTest',
            url: 'http://testUrl.com',
            likes: 1,
            user: [user],
            id: '618ask18291289as'
        }

        const component = render(
            <Blog blog={blog} user={user.name}/>
        )

        const div = component.container.querySelector('.blog')

        const button = component.container.querySelector('.detailsButtons')
        fireEvent.click(button)

        expect(div).toHaveTextContent(blog.url)
        expect(div).toHaveTextContent(blog.likes)
    })

    test('Like button\'s event handler received as props is called twice', () => {
        const user = {
            username: 'username1',
            name: 'user1',
            id: '2189AB'
        }

        const blog = {
            title: 'Test Programming',
            author: 'AuthorTest',
            url: 'http://testUrl.com',
            likes: 1,
            user: [user],
            id: '618ask18291289as'
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} user={user.name} updateBlog={mockHandler}/>
        )

        const detailsButton = component.container.querySelector('.detailsButtons')
        fireEvent.click(detailsButton)

        const likesButton = component.container.querySelector('.likeButtons')
        fireEvent.click(likesButton)
        fireEvent.click(likesButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})