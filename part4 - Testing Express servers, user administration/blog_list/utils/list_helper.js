const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (!blogs.length) {
        return null;
    }
    let most = blogs[0]
    blogs.forEach(blog => {
        if(blog.likes > most.likes){
            most = blog
        }
    })

    return most
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}