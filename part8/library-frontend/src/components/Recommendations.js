import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOK_BY_GENRE, ME } from '../queries'

const Recommendations = ({ show }) => {
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const result = useQuery(ME)

    const [ recommendations, {loading, data} ] = useLazyQuery(ALL_BOOK_BY_GENRE, {
        variables: { genre: favoriteGenre },
        pollInterval: 2000
    })

    useEffect(() => {
        if (result.data) {
            setFavoriteGenre(result.data.me.favoriteGenre)
        }
    },[setFavoriteGenre, result, favoriteGenre])

    useEffect(() => {
        if (favoriteGenre) {
            recommendations({ variables: { genre: favoriteGenre } })
        }
    }, [favoriteGenre, recommendations, data])


    if (!show) {
        return null
    }

    if (result.loading || loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>patterns</b></p>
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
                    {data && data.allBooks.map(book =>
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Recommendations