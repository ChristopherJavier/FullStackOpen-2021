import blogService from '../services/blogs'
import loginService from '../services/login'

const authReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data
        case 'LOGOUT_USER':
            return action.data
        case 'INIT_USER':
            return action.data
        default:
            return state
    }
}

export const logUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem(
            'loggedBlogslistUser', JSON.stringify(user)
        )

        await blogService.setToken(user.token)

        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.clear()
        await blogService.setToken()
        
        dispatch({
            type: 'LOGOUT_USER',
            data: null
        })
        
    }
}

export const initTheUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogslistUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            await dispatch({
                type: 'INIT_USER',
                data: user
            })
            blogService.setToken(user.token)
        }
    }
}

export default authReducer