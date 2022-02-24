import React, { useState } from 'react'

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
            <form onSubmit={addBlog}>
                <div>
          Title:
                    <input
                        id={'title'}
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
          Author:
                    <input
                        id={'author'}
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
          Url:
                    <input
                        id={'url'}
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id={'saveBlogButton'} type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm