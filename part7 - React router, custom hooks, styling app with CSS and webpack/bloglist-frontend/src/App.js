import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, setUser, logout } from './reducers/userReducer'
import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])


  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const log_out = () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const blogCreationForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div>
          <Notification style="error" message={errorMessage} />
        </div>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <Notification style="message" message={errorMessage} />
      </div>
      <div>
        {user.name} logged in
        <button onClick={log_out}>
          logout
        </button>
      </div>
      <br />
      <div>
        {blogCreationForm()}
      </div>
      {blogs.map(blog =>
        <Blog username={user.username} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App