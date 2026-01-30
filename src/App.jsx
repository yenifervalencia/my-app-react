import { useState } from 'react'
import './App.css'
import { Login } from './pages/login'
import { RouterApp } from './routing/RouterApp'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <RouterApp></RouterApp>
    </BrowserRouter>
  )
}

export default App
