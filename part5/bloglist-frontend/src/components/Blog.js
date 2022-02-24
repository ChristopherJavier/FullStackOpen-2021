import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = () => {
        const modifiedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        updateBlog(blog.id, modifiedBlog)
    }

    const removeBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id, blog)
        }
    }

    const removeButton = () => {

        if(user === blog.user[0].name){
            return(
                <button className={'removeButton'} onClick={removeBlog}>remove</button>
            )
        }
    }

    const showDetails = () => {
        return (
            <div>
                <ul className={'list'}>
                    <li>{blog.url}</li>
                    <li>likes {blog.likes} <button className={'likeButtons'} onClick={addLike}>like</button></li>
                    <li>{blog.user[0].name}</li>
                </ul>
                {removeButton()}
            </div>
        )
    }

    return (
        <div className={'blog'} style={blogStyle}>
            {blog.title}  {blog.author}<button className={'detailsButtons'} onClick={toggleVisibility}>details</button>
            {visible !== false && showDetails()}
        </div>
    )
}


Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}

export default Blog