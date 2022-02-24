import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, updatedObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, updatedObject)
    return request.data
}

const deleteOne = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
}

const createComment = async (id, comment) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = await axios.post(`${baseUrl}/${id}/comments`, {comment: comment}, config)
    return request.data
}

export default { getAll, create, setToken, update, deleteOne, createComment }