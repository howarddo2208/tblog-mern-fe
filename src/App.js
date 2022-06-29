import React from 'react'
import './styles/main.css'
import MainRouter from './MainRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth, useAIModels, useSocket } from './state'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import * as nsfwjs from 'nsfwjs'
import * as toxicity from '@tensorflow-models/toxicity'
import '@tensorflow/tfjs'

const App = () => {
  const { socket, setSocket } = useSocket()
  const { userId } = useAuth()
  const { nsfwModel, toxicityModel, setNSFW, setToxicity } = useAIModels()

  const loadModels = async () => {
    const nsfwModel = await nsfwjs.load(`/nsfw/`, { size: 299 })
    setNSFW(nsfwModel)
    const toxicityModel = await toxicity.load()
    setToxicity(toxicityModel)
  }

  useEffect(() => {
    try {
      loadModels()
    } catch (err) {
      console.log('err load models', err)
    }
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

