import { useQuery } from '@apollo/client'
import React from 'react'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
    const meResult = useQuery(ME)
    const booksResult = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }
    if (meResult.loading || booksResult.loading) {
        return <div>loading...</div>
    }

    const me = meResult.data.me
    const books = booksResult.data.allBooks.filter(book => book.genres.includes(me.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>

            <div>
                books in your favorite genre <strong>{me.favoriteGenre}</strong>
            </div>

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
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}

export default Recommended