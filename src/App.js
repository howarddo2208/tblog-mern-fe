import React from 'react'
import './styles/main.css'
import AppProviders from './components/AppProviders/AppProviders'
import MainRouter from './MainRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth, useFish, useSocket } from './stateManagements'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const App = () => {
  const { socket, setSocket } = useSocket()
  const { userId } = useAuth()

  useEffect(() => {
    if (!socket) {
      const newSocket = io(process.env.REACT_APP_SOCKET_IO_URL)
      setSocket(newSocket)
    }

    if (socket && userId) {
      socket.emit('join', {
        userId: userId,
      })
    }
  }, [socket, userId])

  return (
    <AppProviders>
      <MainRouter />
      <ToastContainer />
    </AppProviders>
  )
}

export default App

