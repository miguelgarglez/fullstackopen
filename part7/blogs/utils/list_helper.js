const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
        return blogs.reduce((favorite, blog) => 
                favorite.likes > blog.likes 
                    ? favorite 
                    : {title: blog.title, author: blog.author, likes: blog.likes},
               {})
}

const mostBlogs = (blogs) => {
    // This function should return the author who has the largest amount of blogs
    // in an object like: { author: 'authorName', blogs: blogCount }
    // using Lodash library is allowed and a plus actually

    if (blogs.length === 0) {
        return {}
    } else if (blogs.length === 1) {
        return { author: blogs[0].author, blogs: 1 }
    } else {
        const authors = blogs.map(blog => blog.author)
        const authorCount = authors.reduce((acc, author) => {
            acc[author] = (acc[author] || 0) + 1
            return acc
        }, {})
        const mostBlogs = Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b)
        return { author: mostBlogs, blogs: authorCount[mostBlogs] }
    

    }
}

const mostLikes = (blogs) => {
    // This function should return the author who has the largest amount of likes
    // in an object like: { author: 'authorName', likes: likeCount }
    // using Lodash library is allowed and a plus actually

    if (blogs.length === 0) {
        return {}
    } else if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes }
    } else {
        const authorLikes = blogs.reduce((acc, blog) => {
            acc[blog.author] = (acc[blog.author] || 0) + blog.likes
            return acc
        }, {})
        const mostLikes = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b)
        return { author: mostLikes, likes: authorLikes[mostLikes] }
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}