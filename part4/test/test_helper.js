const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")

const initialTestBlogs = [
    {
        title: "TestBlog1",
        author: "TestAuthor1",
        url: "https://testdb1",
        likes: 1
    },
    {
        title: "TestBlog2",
        author: "TestAuthor2",
        url: "https://testdb2",
        likes: 2
    },
    {
        title: "TestBlog3",
        author: "TestAuthor3",
        url: "https://testdb3",
        likes: 3
    },
    {
        title: "TestBlog4",
        author: "TestAuthor4",
        url: "https://testdb4",
        likes: 4
    }
]

const initialTestUsers = [
    {
        username: "testUser1",
        name: "testUser1",
        password: "102AB83"
    },
    {
        username: "testUser2",
        name: "testUser2",
        password: "1928BB2"
    }
]

const newTestBlog = {
    title: "newTestBlog1",
    author: "newTestAuthor1",
    url: "https://testdbnew1",
    likes: 100
}

const missingLikesBlog = {
    title: "NewTestBlog1",
    author: "TestAuthorBlog1",
    url: "https://testdbBlog",
}

const noTitleBlog = {
    author: "TestAuthorBlog",
    likes: 0
}

const noUrlBlog = {
    title: "TestBlog1",
    author: "TestAuthor1",
    likes: 1
}

const updatedTestBlog = {
    title: "NewTestBlogUpdated",
    author: "TestAuthorBlogUpdated",
    url: "https://testdbBlogUpdated",
    likes: 1000
}

const invalidUser = {
    name: "UserTest",
    password: "323453"
}

const invalidUser1 = {
    username: "UserNameTest",
    name: "UserTest"
}

const minLengthUser = {
    username: "Us",
    name: "UserTest",
    password: "323453"
}

const minLengthUser1 = {
    username: "User",
    name: "UserTest",
    password: "32"
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const passwordHasher = (password) => {
    const saltRounds = 10
    const passwordHash = bcrypt.hashSync(password, saltRounds)
    return passwordHash
}

const hashedInitialUsers = initialTestUsers.map((user) => {
    const hashPassword = passwordHasher(user.password)
    user.passwordHash = hashPassword
    delete user.password
    return user
})

const tokenGenerator = async () => {
    const users = await usersInDb()

    const userForToken = {
        username: users[0].username,
        id: users[0].id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
}

module.exports = {
    initialTestBlogs,
    initialTestUsers,
    newTestBlog,
    missingLikesBlog,
    noTitleBlog,
    noUrlBlog,
    updatedTestBlog,
    invalidUser,
    invalidUser1,
    minLengthUser,
    minLengthUser1,
    blogsInDb,
    usersInDb,
    hashedInitialUsers,
    tokenGenerator,
}