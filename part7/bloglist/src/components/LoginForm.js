import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
        <Form.Label>username:</Form.Label>
                <Form.Control
                    id={'username'}
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </Form.Group>
            <Form.Group>
        <Form.Label>password:</Form.Label>
                <Form.Control
                    id={'password'}
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <Button id={'login-button'} type="submit">login</Button>
        </Form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm