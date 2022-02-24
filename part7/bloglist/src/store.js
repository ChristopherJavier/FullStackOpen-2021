import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducers from './reducers/blogsReducer'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducers,
    auth: authReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store