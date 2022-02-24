import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
    const style = {
        'align-self': 'center',
        'margin-left': '0.5em'
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Nav classname="me-auto">
                    <Nav.Link>
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                    {!user
                        ? null
                        : <div style={style}>{user.name} logged in <Button variant="primary" onClick={() => handleLogout()}>logout</Button></div>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Menu