import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDetails = () => {
    setShowDetails(!(showDetails))
  }

  const updateBlog = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const label = showDetails ? "hide" : "show"

  const name = blog.user !== undefined
    ? blog.user.username
    : null

  const removeButton = () => (
    <div>
      <button id='removeButton' onClick={removeBlog}>remove</button>
    </div>
  )

  const details = () => (
    <div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button id='like' onClick={updateBlog}>like</button>
      </div>
      <div>
        {name}
      </div>
      <div>
        {username === name ? removeButton() : null}
      </div>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <strong>{blog.title}</strong> by {blog.author}
      <button id='details' onClick={handleDetails}>{label}</button>
      <div>
        {showDetails === true ?
          details() :
          null
        }
      </div>
    </div>
  )
}

export default Blog