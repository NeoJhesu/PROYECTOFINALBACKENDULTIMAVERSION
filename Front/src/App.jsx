import React from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'  
import RouterPague from './RouterPague'
import ContexProvider from './ContexManager/ContexProvider'

function App() {

  return (
    <div>
      <BrowserRouter>
      <ContexProvider>
      <RouterPague/>
      </ContexProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
