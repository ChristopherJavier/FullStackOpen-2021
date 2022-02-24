import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const URI = `https://restcountries.com/v2/name/${name}?fullText=true`

    useEffect(() => {
        axios
            .get(URI)
            .then((response) => {
                setCountry(response.data)
            })
    }, [URI])

    if (name === '') {
        return null
    }

    if (!country) {
        return []
    }

    if (country.status) {
        return []
    }

    return country
}