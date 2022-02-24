import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const AuthorsBornForm = ({ notify, authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [changeBornYear, result] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [
            { query: ALL_AUTHORS }
        ],
        onError: (error) => {
            notify(error.graphQLErrors[0].message)
            console.log(error.graphQLErrors[0].message)
        }
    })

    const submit = (event) => {
        event.preventDefault()

        changeBornYear({ variables: { name, born: Number(born) } })

        setName('')
        setBorn('')
    }

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            notify('Author not Found')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])
    return (
        <div style={{ marginTop: '1em' }}>
            <h2>Set birth year</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Author </label>
                    <select onChange={({ target }) => setName(target.value)}>
                        {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                    </select>
                </div>
                <div>
                    born<input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default AuthorsBornForm