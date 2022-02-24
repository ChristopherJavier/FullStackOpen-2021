const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({}).populate("user", { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate("user", { username: 1, name: 1 })

    if (blog === null) {
        response.status(404).end()
    }

    response.json(blog)
})

blogsRouter.get("/:id/comments", async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)

    if (blog === null) {
        response.status(404).end()
    }
    
    response.json(blog.comments)
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    if (!request.token) {
        return response.status(401).json({ error: "token missing or invalid" })
    }

    if (!request.user) {
        return response.status(401).json({ error: "user missing or invalid" })
    }

    const user = await User.findById(request.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    if (!body.title) {
        return response.status(400).json({
            error: "title missing"
        })
    }

    if (!body.url) {
        return response.status(400).json({
            error: "url missing"
        })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
    
    if (!request.token) {
        return response.status(401).json({ error: "token missing or invalid" })
    }

    if (typeof request.body.comment !== "string") {
        return response.status(400).json({ error: "The comment need to be a string" })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog) {
        blog.comments = blog.comments.concat(request.body.comment)
        const savedBlog = await blog.save()

        response.status(201).json(savedBlog)
    }

    if (!blog) {
        return response.status(404).json({ error: "blog not found" })
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id

    const userId = request.user

    const blog = await Blog.findById(id)

    if (!blog) {
        response.status(400).end()
    }

    if (blog.user.toString() === userId.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    }

    if (blog.user.toString !== userId.toString()) {
        response.status(401).end()
    }

})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const userId = request.user

    const blog = await Blog.findById(request.params.id)

    const modifiedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true })
    response.json(updatedBlog)
    response.status(200).end()

    /*  if (!request.token) {
        response.status(401).json({ error: "token missing or invalid" })
     }
 
     if (blog.user.toString() === userId.toString()) {
         
     }
 
     if (blog.user.toString !== userId.toString()) {
         response.status(401).end()
     } */

})

module.exports = blogsRouter