import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '',
        issues: []
    }
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then (res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch (err => console.log(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then (res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            console.log(user)
            async function getThatData()  {
                getUserIssue(user._id)
                await delay(1000)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))}
            getThatData()
        })
        .catch (err => console.dir(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({user: {}, token: '', issues: []})
    }

    function addIssue(newIssue) {
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssue(user) {
        userAxios.get(`/api/issue/${user}`)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addIssue} }>
            { props.children }
        </UserContext.Provider>
    )
}