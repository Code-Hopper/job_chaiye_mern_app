import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from "./components/pages/Home.jsx"
import UserLoginRegister from './components/pages/UserLoginRegister.jsx'

// context
import { UserProvider } from './context/userContext.jsx'
import { MessageProvider } from './context/messageContext.jsx'
import Message from './components/sections/actions/Message.jsx'
import UserDashboard from './components/pages/UserDashboard/UserDashboard.jsx'
import { JobProvider } from './context/jobContext.jsx'
import DisplayJob from './components/pages/DisplayJob.jsx'

const App = () => {

  return (
    <>
      <UserProvider>
        <MessageProvider>
          <Message />
          <JobProvider>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/user-login-register' element={<UserLoginRegister />} />
                <Route path='/user/dashboard' element={<UserDashboard />} />
                <Route path='/job/:jobId' element={<DisplayJob />} />
              </Routes>
            </Router>
          </JobProvider>
        </MessageProvider>
      </UserProvider>
    </>
  )
}

export default App