import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className={'blogFormDiv'}>
            <h2>Create a new blog</h2>
            <Form onSubmit={addBlog}>
                <Form.Group className='mb-3'>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        id={'title'}
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        id={'author'}
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        id={'url'}
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button variant='success' id={'saveBlogButton'} type="submit">save</Button>
            </Form>
        </div>
    )
}

export default BlogForm