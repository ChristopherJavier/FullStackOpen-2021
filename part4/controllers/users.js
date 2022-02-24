const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    
    const users = await User
        .find({})
        .populate("blogs", { title: 1, author: 1, url: 1 })

    response.json(users)
})

usersRouter.get("/:id", async (request, response) => {
    const user = await User
        .findById(request.params.id)
        .populate("blogs", { title: 1, author: 1, url: 1 })

    response.json(user)
})

usersRouter.post("/", async (request, response) => {
    const body = request.body

    const usernameVer = await User.findOne({ username: body.username })

    if (usernameVer) {
        return response.status(400).json({ error: "Username must be unique" })
    }

    if (!body.username) {
        return response.status(400).json({ error: "username missing" })
    }

    if (!body.password) {
        return response.status(400).json({ error: "password missing"})    
    }

    if (body.username.length < 3) {
        return response.status(400).json({ error: "the username length is shorter than the minimum allowed length (3)"})
    }

    if (body.password.length < 3) {
        return response.status(400).json({ error: "the password length is shorter than the minimum allowed length (3)"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter