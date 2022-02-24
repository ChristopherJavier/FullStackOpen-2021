import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')
    userToken && setToken(userToken)
  }, [setToken])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      
      window.alert(`the book '${addedBook.title}' successfully added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token
          ? <button onClick={() => setPage('loginForm')}>login</button>
          : (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          )
        }
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        notify={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'loginForm'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

      {token &&
        <Recommendations
          show={page === 'recommend'}
        />
      }
    </div>
  )
}

export default App