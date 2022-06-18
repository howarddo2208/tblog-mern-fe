import React from 'react'
import './styles/main.css'
import AppProviders from './components/AppProviders/AppProviders'
import MainRouter from './MainRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFish } from './stateManagements'

const App = () => {
  return (
    <AppProviders>
      <MainRouter />
      <ToastContainer />
    </AppProviders>
  )
}

export default App

