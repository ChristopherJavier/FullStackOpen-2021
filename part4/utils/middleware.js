const jwt = require("jsonwebtoken")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
    if (process.env.NODE_ENV !== "test") {
        console.log("Method: ", request.method)
        console.log("Path: ", request.path)
        console.log("Body: ", request.body)
        console.log("---")
    }

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({
            error: "malformatted id"
        })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token"
        })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")

    request.token = null

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7)
    }

    next()
}

const userExtractor = (request, response, next) => {
    const token = request.token

    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        request.user = decodedToken.id.toString()
    }

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}