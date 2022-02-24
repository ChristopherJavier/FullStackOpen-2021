import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { addNewComment } from '../reducers/blogsReducer'
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blogs, updateBlog, deleteBlog, user }) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    const dispatch = useDispatch()
    const history = useHistory()
    const comment = useField('text')
    const rndKey = () => Math.random().toString(36).substring(2, 10)

    const addLike = () => {
        updateBlog(blog.id, blog.title)
    }

    const removeBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id, blog)
            history.push('/')
        }
    }

    const removeButton = () => {
        if (user.name === blog.user[0].name) {

            return (
                <>
                    <Button variant='danger' className={'removeButton'} onClick={removeBlog}>remove blog</Button>
                </>
            )
        }
    }

    const addComment = (event) => {
        event.preventDefault()
        dispatch(addNewComment(blog.id, comment.value))
        comment.reset()
    }

    if (!user || !blog) {
        return null
    }

    return (
        <Container>
            <Card>
                <Card.Header>Blog</Card.Header>
                <Card.Body>
                    <Card.Title>{blog.title} {blog.author}</Card.Title>
                    <ul className={'list'}>
                        <li><a href={`${blog.url}`}>{blog.url}</a></li>
                        <li>{blog.likes} likes <Button variant='primary' className={'likeButtons'} onClick={addLike}>like</Button></li>
                        <li>added by <b>{blog.user[0].name}</b></li>
                    </ul>
                    {removeButton()}
                </Card.Body>
            </Card>
            <div id='comments_container'>
                <h3>Comments</h3>
                {blog.comments.length === 0
                    ? (
                        <>
                            <ListGroup as='ul'>
                                <ListGroup.Item as='li'>This blog has not comments yet</ListGroup.Item>
                            </ListGroup>
                        </>
                    )
                    : (
                        <>
                            <ListGroup>
                                {blog.comments.map(comment => (
                                    <ListGroup.Item key={rndKey()}>{comment}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    )
                }
            </div>
            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Label>Add a new comment</Form.Label>
                    <Form.Control
                        type={comment.type}
                        value={comment.value}
                        onChange={comment.onChange}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>save</Button>
            </Form>
        </Container >
    )
}


Blog.propTypes = {
    blogs: PropTypes.array.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog