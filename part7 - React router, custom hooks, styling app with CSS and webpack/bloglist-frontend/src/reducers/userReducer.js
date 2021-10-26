import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return action.data
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        await blogService.setToken(user.token)
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        dispatch({
            type: 'LOG_IN',
            data: user
        })
    }
}

export const setUser = (user) => {
    return async dispatch => {
        await blogService.setToken(user.token)
        dispatch({
            type: 'LOG_IN',
            data: user
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export default reducer