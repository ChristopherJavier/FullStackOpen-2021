import React from 'react'
import { useParams } from 'react-router-dom'
import { Container,  ListGroup } from 'react-bootstrap'

const User = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (!user) {
        return null
    }

    return (
        <Container>
            <h2 className='title_of_page'>{user.name}</h2>
            <ListGroup>
            <h3 >Added Blogs</h3>
            {user.blogs.map(
                blog => <ListGroup.Item key={blog.id} className='blogs_of_user'>{blog.title}</ListGroup.Item>
            )}
            </ListGroup>
        </Container>
    )
}

export default User