import React from 'react'

import './App.css'

import VideoPlayer from './components/VideoPlayer'
import Nots from './components/Nots'
import Options from './components/Options'

const App = () => {
  return (
    <div className='app'>
        <header>
            <h3>CHATVYD.</h3>
        </header>
        <VideoPlayer />
        <Options>
            <Nots />
        </Options>
    </div>
  )
}

export default App