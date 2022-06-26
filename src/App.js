import React from 'react'
import './styles/main.css'
import MainRouter from './MainRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth, useAIModels, useSocket } from './stateManagements'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import Layout from './components/Layout'

const App = () => {
  const { socket, setSocket } = useSocket()
  const { userId } = useAuth()
  const { loadModel } = useAIModels()

  useEffect(() => {
    loadModel()
  }, [])

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
    <>
      <MainRouter />
      <ToastContainer />
    </>
  )
}

export default App

