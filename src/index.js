const { ApolloServer, gql } = require('apollo-server')
const { find } = require('lodash')

const books = [
  {
    id: 1,
    title: 'title book',
    author: 'test',
  },
]

const authors = [
  {
    id: 1,
    bookId: 1,
    name: 'test',
  },
]

let id = 1

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: Author
  }

  type Author {
    id: ID!
    bookId: ID!
    name: String
    books: [Book]
  }

  type Query {
    author: [Author]
    book: [Book]
  }

  type Mutation {
    author(name: String): Author
  }
`

const resolvers = {
  Query: {
    author: (parent, args) => {},
    book: () => books,
  },
  Mutation: {
    author: (parent, args) => {
      const author = {
        id: ++id,
        name: args.name,
      }
      authors.push(author)
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
