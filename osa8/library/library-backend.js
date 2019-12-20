const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./model/Author')
const Book = require('./model/Book')
const User = require('./model/User')
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!,
    author: Author,
    published: String,
    genres: [String],
    id: ID!
  }

  type Author {
    name: String,
    born: Int,
    bookCount: Int!
    id: ID!
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
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genres: [ String ]): [Book],
    allAuthors: [Author],
    allGenres: [String],
    me: User
  }

  type Mutation {
    addBook(
      title: String,
      author: String,
      published: Int,
      genres: [String]
    ) : Book,
    editAuthor(
      name: String, 
      setBornTo: Int
    ) : Author,
    addAuthor(
      name: String!,
      born: Int!
    ) : Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token

  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => {
        return pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }
  },
  Query: {
    bookCount: async () => {
      const allBooks = await Book.find( {} )
      return allBooks.length
    },
    authorCount: async () => {
      const allAuthors = await Author.find( {} )
      return allAuthors.length
    },
    allBooks: async (root, args) => {     
      console.log(args);
      if(!args.author && !args.genres) {
        return Book.find( {} ).populate('author')
      }
      let booksToReturn = []
      /*if(args.author) {
        const booksWithRightAuthor = books.filter(book => {
          console.log(book);
          return book.author === args.author.name})
        booksToReturn.push( ...booksWithRightAuthor )
      }*/
      if(args.genres) {
        console.log(args.genres);
        const booksWithRightGenre = 
          await Book.find({ genres: { $in: [ ...args.genres] } }).populate('author')
        booksToReturn.push( ...booksWithRightGenre )
      }      
      return booksToReturn
    },
    allAuthors: () => {
      return Author.find( {} )
    },
    allGenres: async() => {
      console.log('AllGenres');
      let genres = []
      const books = await Book.find({ })
      books.forEach(book => {
        book.genres.forEach(genre => {
          if(!genres.includes(genre)) {
            genres.push(genre)
          }
        })    
      })
      console.log(genres);
      return genres;
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
 },
  Author: {
    bookCount: async (root) => {
      const booksWhereAuthor = await Book.find({ author: root._id })
      return booksWhereAuthor.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
    if(!context.currentUser) {
      throw new AuthenticationError('Ei kirjautunut')
    }
     allBooks = await Book.find( {} )
      if(allBooks.length > 0 && allBooks.find(book => book.title === args.title)) {
        throw new UserInputError('Kirja on jo olemassa', { invalidArgs: args.name })
      }      
      let bookAuthor = await Author.findOne({ name: args.author })
      if (!bookAuthor) {
        try {
          const newAuthor = new Author({
            name: args.author
          })
          bookAuthor = await newAuthor.save()
        } catch (error) {
          throw new UserInputError('Uuden kirjailijan tallennus epäonnistui: ' + error.message, {
            invalidArgs: args,
          })
        }        
      }
      const newBook = new Book({
        ...args,
        author: bookAuthor
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError('Kirjan tallennus epäonnistui: ' + error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new UserInputError('Ei kirjautunut')
      }
      const author = await Author.findOne({ name: args.name });
      if(!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch(error) {
        throw new UserInputError('Kirjailijan muokkaus epäonnistui: ' + error.message, {
          invalidArgs: args,
        })
      }      
    },
    addAuthor: async (root, args) => {
      const newAuthor = new Author({ ...args })
      try {
        return await newAuthor.save() 
      } catch {
        throw new UserInputError('Kirjailijan tallennus epäonnistui: ' + error.message, {
          invalidArgs: args,
        })
      }          
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      try {
        return await newUser.save();
      } catch(error) {
        throw new UserInputError('Käyttäjän luonti epäonnistui: ' + error.message, {
          invalidArgs: args,
        })
      }
    }, 
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (args.password !== "1234") {
        throw new UserInputError("Väärä salasana")
      }
      const token = jwt.sign({ user: user.username, id: user._id }, "secret")
      console.log('token: ', token)
      return { value: token }
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), "secret"
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})