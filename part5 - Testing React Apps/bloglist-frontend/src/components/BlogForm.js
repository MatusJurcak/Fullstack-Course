import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>

            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        value={newTitle}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        value={newAuthor}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        value={newUrl}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button id='submit-button' type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm