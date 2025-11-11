import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from "./components/pages/Home.jsx"
import UserLoginRegister from './components/pages/UserLoginRegister.jsx'

// context
import { UserProvider } from './context/userContext.jsx'
import { MessageProvider } from './context/messageContext.jsx'
import Message from './components/sections/actions/Message.jsx'

const App = () => {

  return (
    <>
      <UserProvider>
        <MessageProvider>
          <Message/>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/user-login-register' element={<UserLoginRegister />} />
            </Routes>
          </Router>
        </MessageProvider>
      </UserProvider>
    </>
  )
}

export default App
