const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI);

const findOrCreate = async (name) => {
    let author = await Author.findOne({ name })
  
    if ( !author ) {
      author = new Author({ name })
      await author.save()
    }
  
    return author
  }
  

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
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

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
    
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, { author, genre }) => {
            const query = {}

            if (author) {
                const theAuthor = await Author.findOne({ name: author })
                query.author = theAuthor.id
            }
            if (genre) {
                query.genres = { $in: [genre] }
            }
            return Book.find(query).populate('author')
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find()
            const filteredBooks = books.filter(book => String(book.author) === String(root.id))
            return filteredBooks.length
        }
    },
    Mutation: {
        addBook: async (root, { title, published, author, genres }, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            let book = new Book({ title, published, genres })
            try {
                book.author = await findOrCreate(author)
                await book.save()
                
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: { title, author, published, genres },
                })
            }
            book = await Book.findById(book.id).populate('author')
            return book
        },
        editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            const author = await Author.findOne({ name })
            author.born = setBornTo
            await author.save()
            return author
        },
        createUser: (root, { username, favoriteGenre }) => {
            const user = new User({ username, favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})