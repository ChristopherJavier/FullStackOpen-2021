const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    const users = helper.hashedInitialUsers
    const newUsers = users.map(user => new User(user))
    const usersSaves = newUsers.map(user => user.save())
    await Promise.all(usersSaves)

    const getUsersInDb = await helper.usersInDb()
    const userIdForBlog = getUsersInDb[0].id

    const newBlogs = helper.initialTestBlogs.map(blog => new Blog({ ...blog, user: userIdForBlog }))
    const blogsSaves = newBlogs.map(blog => blog.save())
    await Promise.all(blogsSaves)
})

jest.setTimeout(90000)

describe("Test the functionalities of the backend for operation with blogs", () => {
    
    test("the blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect("Content-Type", /application\/json/)
    })

    test("the returned amount of notes is correct", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(helper.initialTestBlogs.length)
    })

    test("the unique identifier property is named id", async () => {
        const response = await api.get("/api/blogs")
        const blogsIds = response.body.map(blog => blog.id)

        expect(blogsIds).toBeDefined()
    })

    test("making a POST request successfull creates a new blog", async () => {
        const token = await helper.tokenGenerator()

        await api
            .post("/api/blogs")
            .send(helper.newTestBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")
        const savedBlog = response.body.filter(res => res.url === helper.newTestBlog.url)

        expect(response.body).toHaveLength(helper.initialTestBlogs.length + 1)
        expect(savedBlog).toContainEqual(response.body[response.body.length - 1])
    })

    test("verify if likes property is missing and return 0", async () => {
        const token = await helper.tokenGenerator()

        const response = await api
            .post("/api/blogs")
            .send(helper.missingLikesBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(201)

        expect(response.body.likes).toBe(0)
    })

    test("responds with status 400 when blog's title and url is missing", async () => {
        const token = await helper.tokenGenerator()

        await api
            .post("/api/blogs")
            .send(helper.noTitleBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(400)
        
            await api
            .post("/api/blogs")
            .send(helper.noUrlBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(400)
    })

    test("deleting a blog is successful", async () => {
        const token = await helper.tokenGenerator()

        await api
            .post("/api/blogs")
            .send(helper.newTestBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(201)

        const response = await api.get("/api/blogs")
        const responseId = response.body[response.body.length - 1].id

        await api
            .delete(`/api/blogs/${responseId}`)
            .set("Authorization", `bearer ${token}`)
            .expect(204)
    })

    test("updating a blog is succesfull", async () => {
        const token = await helper.tokenGenerator()

        await api
            .post("/api/blogs")
            .send(helper.newTestBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(201)

        const response = await api.get("/api/blogs")
        const responseId = response.body[response.body.length - 1].id

        await api
            .put(`/api/blogs/${responseId}`)
            .send(helper.updatedTestBlog)
            .set("Authorization", `bearer ${token}`)
            .expect(200)
    })

    test("adding a blog fails if a token is not provided", async () => {
        
        await api
            .post("/api/blogs")
            .send(helper.newTestBlog)
            .expect(401)
    })

})

describe("Test the functionalities of the backend for operation with users", () => {

    test("response with status code 400 if user doesn't have username", async () => {
        await api
            .post("/api/users")
            .send(helper.invalidUser)
            .expect(400)
    })

    test("response with status code 400 if user doesn't have password", async () => {
        await api
            .post("/api/users")
            .send(helper.invalidUser1)
            .expect(400)
    })

    test("response with status code 400 if username or password length is less than the minimun", async () => {
        await api
            .post("/api/users")
            .send(helper.minLengthUser)
            .expect(400)

        await api
            .post("/api/users")
            .send(helper.minLengthUser1)
            .expect(400)
    })

    test("an invalid user is not created", async () => {
        await api
            .post("/api/users")
            .send(helper.invalidUser)
            .expect(400)

        const response = await api.get("/api/users")

        expect(response.body).toHaveLength(helper.initialTestUsers.length)
    })

    test("the username of an user must be unique", async () => {

        await api
            .post("/api/users")
            .send(helper.initialTestUsers[0])
            .expect(400)
    })

})

afterAll(() => {
    mongoose.connection.close()
})