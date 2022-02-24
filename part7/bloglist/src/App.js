import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, useHistory,
    Redirect
} from 'react-router-dom'
import { useField } from './hooks'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import { setNewNotification } from './reducers/notificationReducer'
import { addNewLike, initializeBlogs, saveNewBlog, removeBlog } from './reducers/blogsReducer'
import { logUser, logoutUser, initTheUser } from './reducers/authReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Table, Container } from 'react-bootstrap'

const App = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)
    const username = useField('text')
    const password = useField('password')
    const user = useSelector(state => state.auth)
    const users = useSelector(state => state.users)

    const blogsOrder = blogs.sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        dispatch(initTheUser())
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()


        try {
            await dispatch(logUser(username.value, password.value))
            username.reset()
            password.reset()
            history.push("/")
        } catch (exception) {
            dispatch(setNewNotification('Wrong credentials', 'error'))
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const saveBlog = async (newObject) => {

        try {
            await dispatch(saveNewBlog(newObject, user))
            dispatch(setNewNotification(`a new blog ${newObject.title} by ${newObject.author} was created`, 'success'))
        } catch (exception) {
            dispatch(setNewNotification('Something wrong when saving the blog', 'error'))
        }
    }

    const updateBlog = async (id, blog) => {
        try {
            dispatch(addNewLike(id))
            dispatch(setNewNotification(`You liked ${blog}`, 'success'))
        } catch (error) {
            dispatch(setNewNotification('Something wrong when saving the blog', 'error'))
        }
    }

    const deleteBlog = async (id, blog) => {
        try {
            dispatch(removeBlog(id))
            dispatch(setNewNotification(`The blog ${blog.title} of ${blog.author} was successfully deleted`, 'success'))
        } catch (error) {
            dispatch(setNewNotification('Something wrong when saving the blog', 'error'))
        }
    }

    return (
        <Router>
            <Menu user={user} handleLogout={handleLogout} />
            <Switch>
                <Route path="/blogs/:id">
                    {!user
                        ? null
                        : (
                            <>
                                <Notification notification={notification} />
                                <Blog blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
                            </>
                        )
                    }
                </Route>
                <Route path="/users/:id">
                    {!user
                        ? <Redirect to="/login" />
                        : <User users={users} />
                    }
                </Route>
                <Route path="/users">
                    {user === null
                        ? <Redirect to="/login" />
                        : <Users user={user} users={users} handleLogout={handleLogout} />
                    }
                </Route>
                <Route path="/login">
                    {user === null ? (
                        <Container>
                            <h2>Log in to application</h2>
                            <Notification notification={notification} />
                            <LoginForm
                                handleSubmit={handleLogin}
                                handleUsernameChange={username.onChange}
                                handlePasswordChange={password.onChange}
                                username={username.value}
                                password={password.value}
                            />
                        </Container>
                    ) : <Redirect to="/" />
                    }
                </Route>
                <Route path="/">
                    {user === null
                        ? <Redirect to="/login" />
                        : (
                            <div className="container">
                                <h2 className='title_of_page'>Blogs</h2>
                                <Notification notification={notification} />
                                <Togglable buttonLabel="new blog">
                                    <BlogForm
                                        createBlog={saveBlog}
                                    />
                                </Togglable>
                                <Table style={{ 'margin-top': '2em' }} striped bordered hover>
                                    <tbody>
                                        {blogsOrder.map(blog =>
                                            <tr>
                                                <td>
                                                    <BlogList key={blog.id} blog={blog} />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                </Route>
            </Switch>
        </Router>
    )
}

export default App