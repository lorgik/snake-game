import React, { useEffect, useRef, useState } from 'react'


function App() {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const canvas = useRef<any>()
  
  function updateCanvas() {
    const context = canvas.current.getContext('2d')
    context.clearRect(0, 0, 600, 600)
    
    context.fillStyle = '#f33636'
    context.fillRect(positionX, positionY, 30, 30)
    
    setPositionX(prev => prev + 30)
    setPositionY(prev => prev)
    // setPositionY(prev => prev + 30)
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateCanvas()
    }, 1000)
    return () => clearInterval(interval)
  }, [updateCanvas])
  
  
  return (
    <div className='w-full h-screen flex items-center justify-around'>
      <canvas className='bg-gray-300 border-gray-900 border-2' ref={canvas} width='600' height='600' />
      <button className='bg-emerald-400 px-4 py-2 rounded outline-0' onClick={updateCanvas}>Обновить</button>
    </div>
  )
}

export default App
