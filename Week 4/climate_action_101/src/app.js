import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Routes>
        <Route 
          exact path="/" 
          component={()=> token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          component={() => <Profile />}
        />
        <Route 
          path="/public"
          component={() => <Public />}
        />
      </Routes>
      <Auth/>
    </div>
  )
}