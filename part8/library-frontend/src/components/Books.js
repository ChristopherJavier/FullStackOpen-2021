import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOK_BY_GENRE } from '../queries'

const Books = ({ show }) => {
  const [filter, setFilter] = useState('allGenres')

  const result = useQuery(ALL_BOOKS)

  const filteredBooks = useQuery(ALL_BOOK_BY_GENRE, {
    variables: { genre: filter }
  })

  if (!show) {
    return null
  }

  if (result.loading || filteredBooks.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books
    .map(book => book.genres)
    .reduce((acc, val) => acc.concat(val), []))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filter === 'allGenres'
            ? (
              books.map(book =>
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            )
            : (
              filteredBooks.data.allBooks.map(book =>
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>)
            )
          }
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
        <button onClick={() => setFilter('allGenres')}>All genres</button>
      </div>
    </div>
  )
}

export default Books