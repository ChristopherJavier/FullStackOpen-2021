import React/* , { useState } */ from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogList = ({ blog }) => {
    /* const blogListStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    } */

    return (
        <div className='blog'>
            <Link to={`/blogs/${blog.id}`} className='blog_details_link'>{blog.title}  {blog.author}</Link>
        </div>
    )
}


BlogList.propTypes = {
    blog: PropTypes.object.isRequired
}

export default BlogList