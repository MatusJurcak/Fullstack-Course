const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Nazov',
        author: 'Matus Jurcak',
        url: 'url',
        likes: 69,
    },
    {
        title: 'Nazov2',
        author: 'Eliska Precova',
        url: 'url',
        likes: 420,
    },
]

const initialUsers = [
    {
        username: "Lil Emdzej",
        name: "Matus Jurcak",
        password: "NepoviemTi123",
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', url: 'url' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }
  
  module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb,
  }