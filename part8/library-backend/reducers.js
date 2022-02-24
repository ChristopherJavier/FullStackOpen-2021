const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRETKEY

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let findAuthor, booksByAuthor, booksByGenre

            if (args.author && args.genre) {
                try {
                    findAuthor = await Author.findOne({ name: args.author })
                    booksByGenre = await Book.find({ author: findAuthor, genres: { $in: [args.genre] } }).populate('author')
                    return booksByGenre
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            if (args.author) {
                try {
                    findAuthor = await Author.findOne({ name: args.author })
                    booksByAuthor = await Book.find({ author: findAuthor.id }).populate('author')
                    return booksByAuthor
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            if (args.genre) {
                try {
                    booksByGenre = await Book.find({ genres: args.genre }).populate('author')
                    return booksByGenre
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            return Book.find({}).populate('author')
        },
        allAuthors: () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({author: root.id })
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const findBook = await Book.findOne({ title: args.title })
            const findAuthor = await Author.findOne({ name: args.author })

            if (findBook && findAuthor) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            if (!findAuthor) {
                const author = new Author({ name: args.author })
                const book = await new Book({ ...args, author: author })

                try {
                    await author.save()/*  */
                    await book.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
                
                pubsub.publish('BOOK_ADDED', { bookAdded: book })
                
                return book
            }

            const book = new Book({ ...args, author: findAuthor })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            
            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            try {
                await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
                return Author.findOne({ name: args.name })
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (args.password !== "secret" || !user) {
                throw new UserInputError("Wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

module.exports = resolvers