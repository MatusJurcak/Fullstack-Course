const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.4zdhh.mongodb.net/phonebook_app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if(process.argv.length === 3){
    console.log(`blogs:`);
    Blog.find({}).then(result => {
        result.forEach(blog => {
            console.log(`${blog.title} ${blog.author} ${blog.likes}`);
        })
        mongoose.connection.close()
    })
}

if(process.argv.length > 3){
    const blog = new Blog({
        title: process.argv[3],
        author: process.argv[4],
        url: process.argv[5],
        likes: process.argv[6],
    })
    blog.save().then(result => {
        console.log(`added ${blog.title}`);
        mongoose.connection.close()
    })
}