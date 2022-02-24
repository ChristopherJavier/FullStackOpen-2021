import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Users = ({ user, users, handleLogout }) => {
    /* const style = {
        margin: '0.5em 0',
        listStyle: 'none'
    } */
    return (
        <Container>
            <h1 className='title_of_page'>blogs</h1>
            <h2 id='user_page_title'>Users</h2>

            <Table id='users_table' bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user => (
                        <>
                            <tr>
                                <td key={user.id}><Link to={`/users/${user.id}`} className='user_info_link'>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        </>
                    )
                    )}
                </tbody>
            </Table>
        </Container>
    )
}

export default Users