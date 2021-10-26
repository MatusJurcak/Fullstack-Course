import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ createBlog }) => {
    const addBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        }
        createBlog(blog)
    }

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>

            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        name="title"
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        name="author"
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        name="url"
                    />
                </div>
                <button id='submit-button' type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { createBlog }
)(BlogForm)