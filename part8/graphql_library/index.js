const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let books = []
      if (!args.author && !args.genre) {
        books = await Book.find({}).populate('author')
      } else if (!args.genre) {
        const author = await Author.findOne({ name: args.author })
        books = await Book.find({ author: author._id })
      } else if (!args.author) {
        books = await Book.find({ genres: { $in: [args.genre] } }).populate(
          'author'
        )
      } else {
        const author = await Author.findOne({ name: args.author })
        books = await Book.find({
          author: author._id,
          genres: { $in: [args.genre] },
        }).populate('author')
      }
      return books
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author._id })
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save()
      }
      let book = new Book({ ...args, author: author._id })
      console.log('book to save')
      console.log(book)

      book = await book.save()
      console.log('book saved', book)

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      updatedAuthor = await Author.findByIdAndUpdate(
        author._id,
        { born: args.setBornTo },
        { new: true }
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
