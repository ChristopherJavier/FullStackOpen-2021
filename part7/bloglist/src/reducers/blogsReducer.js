import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    let id
    let blogToChange

    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data.blogs
        case 'CREATE_BLOG':
            return [...state, action.data.newBlog]
        case 'ADD_LIKE':
            id = action.data.id
            blogToChange = state.find(blog => blog.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : changedBlog)
        case 'ADD_COMMENT':
            id = action.data.id
            blogToChange = state.find(blog => blog.id === id)
            const blogWithComment = {
                ...blogToChange,
                comments: blogToChange.comments.concat(action.data.comment)
            }
            return state.map(blog => blog.id !== id ? blog : blogWithComment)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch({
            type: 'INIT_BLOGS',
            data: {
                blogs: blogs
            }
        })
    }
}

export const saveNewBlog = (newObject, user) => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        const newBlogForUpdate = {
            ...newBlog,
            user: [{ username: user.username, name: user.name, id: newBlog.user[0] }]
        }

        dispatch({
            type: 'CREATE_BLOG',
            data: {
                newBlog: newBlogForUpdate
            }
        })
    }
}

export const addNewLike = (id, updateObject) => {
    return async (dispatch, getState) => {

        dispatch({
            type: 'ADD_LIKE',
            data: {
                id: id
            }
        })
        const { blogs } = getState()
        const changedBlog = blogs.find(blog => blog.id === id)
        await blogService.update(id, changedBlog)
    }
}

export const removeBlog = (id) => {
    return async dispatch => {

        dispatch({
            type: 'DELETE_BLOG',
            data: {
                id: id
            }
        })
        await blogService.deleteOne(id)
    }
}

export const addNewComment = (id, comment) => {
    return async dispatch => {

        await blogService.createComment(id, comment)

        dispatch({
            type: 'ADD_COMMENT',
            data:  {
                id: id,
                comment: comment
            }
        })
    }
}

export default blogsReducer