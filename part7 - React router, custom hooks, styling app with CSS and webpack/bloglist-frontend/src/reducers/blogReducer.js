import blogService from '../services/blogs'

const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'LIKE':
            const likedBlog = action.data
            return state.map(b => b.id !== likedBlog.id ? b : likedBlog).sort(byLikes)
        case 'NEW':
            return [...state, action.data].sort(byLikes)
        case 'INIT':
            return action.data.sort(byLikes)
        case 'DELETE':
            return state.filter(b => b.id !== action.data.id)
        default:
            return state
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const toLike = { ...blog, likes: blog.likes + 1 }
        const data = await blogService.update(toLike)
        dispatch({
            type: 'LIKE',
            data
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW',
            data: newBlog,
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs);
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE',
            data: { id },
        })
    }
}

export default reducer