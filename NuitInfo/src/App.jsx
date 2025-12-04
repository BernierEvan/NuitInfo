import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DecathlonManager from './assets/components/Decathlon/DecathlonManager'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DecathlonManager />
    </>
  )
}



export default App
