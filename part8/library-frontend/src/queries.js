import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author {
            name
            born
        }
        published
        genres
    }
}
`

export const ALL_BOOK_BY_GENRE = gql`
query allBooks($genre: String!){
    allBooks(genre: $genre){
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const ME = gql`
query{
  me {
    username
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author:String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        title
        author{
            name
            born
        }
        published
        genres
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int) {
    editAuthor(name: $name, setBornTo: $born) {
        name
        born
        bookCount
    }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username
        password: $password
    ) {
        value
    }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    title
    published
    author {
        name
        born
    }
    genres
}
`

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}

${BOOK_DETAILS}
`