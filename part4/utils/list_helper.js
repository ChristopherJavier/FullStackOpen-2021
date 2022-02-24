var _ = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const likes = blogs.map(blog => blog.likes)
    const total = likes.reduce((a, b) => a + b)
    return Number(total)
}

const favoriteBlog = (blogs) => {
    const blogsLikes = blogs.map(blog => blog.likes)
    const indexMostLikedBlog = blogsLikes.indexOf(Math.max(...blogsLikes))
    return blogs[indexMostLikedBlog]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return console.log("There are no blogs and no authors")
    }

    const authors = _.map(blogs, "author")
    const blogsOfAuthor = _
        .chain(authors)
        .countBy()
        .toPairs()
        .value()
    
    const mostBlogsAuthor = _.max(blogsOfAuthor)

    const authorWithMostBlogs = [
        {
            author: mostBlogsAuthor[0],
            blogs: mostBlogsAuthor[1]
        }
    ]

    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    
    const reducer = (acc, blog) => {
        acc[blog.author] = acc[blog.author] || 0
        acc[blog.author] += blog.likes
        return acc
    }

    const authorLikes = _.reduce(blogs, reducer, {})

    const authorWithMostLikes = Object.keys(authorLikes).sort((a, b) => authorLikes[b] - authorLikes[a])[0]

    const mostLikedAuthor = [
        {
         author: authorWithMostLikes,
         likes: authorLikes[authorWithMostLikes]   
        }
    ]

    return mostLikedAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}