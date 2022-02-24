import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMsg, setNotificationMsg] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogsOrder = blogs.sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogslistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogslistUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const saveBlog = async (newObject) => {

        try {
            const newBlog = await blogService.create(newObject)
            const newBlogForUpdate = {
                ...newBlog,
                user: [{ username: user.username, name: user.name, id: newBlog.user[0] }]
            }
            setBlogs(blogs.concat(newBlogForUpdate))
            setNotificationMsg(`a new blog ${newObject.title} by ${newObject.author} was created`)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('Something wrong when saving the blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (id, updateObject) => {
        try {
            await blogService.update(id, updateObject)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : updateObject))

        } catch (error) {
            setErrorMessage('Something wrong when updating the blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const deleteBlog = async (id, blog) => {
        try {
            await blogService.deleteOne(id)
            setBlogs(blogs.filter(blog => blog.id !== id))
            setNotificationMsg(`The blog ${blog.title} of ${blog.author} was successfully deleted`)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
        } catch (error) {
            setErrorMessage('You cannot delete this blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification errorMessage={errorMessage} />
                <LoginForm
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    username={username}
                    password={password}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification errorMessage={errorMessage} notificationMsg={notificationMsg} />

            {user.name} logged in <button onClick={() => handleLogout()}>logout</button>
            <Togglable buttonLabel="new blog">
                <BlogForm
                    createBlog={saveBlog}
                />
            </Togglable>
            {blogsOrder.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user.name}/>
            )}
        </div>
    )
}

export default App