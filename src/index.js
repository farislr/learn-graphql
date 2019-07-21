const { ApolloServer, gql } = require('apollo-server')

const books = []
const authors = []

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Query {
    getBooks: [Book]
    getAuthors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`

const resolvers = {
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
  },
  Mutation: {
    addBook: (_, args) => {
      books.push(args)
      return books
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
