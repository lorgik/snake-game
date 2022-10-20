import React, { useEffect, useRef, useState } from 'react'

const stepDelay = 100
const fieldSize = 600
const creatureSize = 30
const fieldWithCreature = fieldSize - creatureSize

function App() {
  const [snakePositionX, setSnakePositionX] = useState(0)
  const [snakePositionY, setSnakePositionY] = useState(0)
  const [snakeLength, setSnakeLength] = useState(0)
  
  const [foodPositionX, setFoodPositionX] = useState(0)
  const [foodPositionY, setFoodPositionY] = useState(0)
  
  const [direction, setDirection] = useState('right')
  const [start, setStart] = useState(false)
  
  const canvas = useRef<any>()
  
  function updateCanvas() {
    if (start) {
      const context = canvas.current.getContext('2d')
      context.clearRect(0, 0, fieldSize, fieldSize)
      
      context.beginPath()
      context.arc(foodPositionX + creatureSize / 2, foodPositionY + creatureSize / 2, creatureSize / 2, 0, 2 * Math.PI, false)
      context.fillStyle = '#2f96ff'
      context.fill()
      
      for (let i = 0; i < snakeLength; i++) {
        context.fillStyle = '#ff8400'
        context.fillRect(snakePositionX, snakePositionY, creatureSize, creatureSize)
      }
      
      
      switch (direction) {
        case 'right':
          if (snakePositionX >= fieldWithCreature) {
            setSnakePositionX(0)
          } else {
            setSnakePositionX(prev => prev + creatureSize)
          }
          break
        
        case 'bottom':
          if (snakePositionY >= fieldWithCreature) {
            setSnakePositionY(0)
          } else {
            setSnakePositionY(prev => prev + creatureSize)
          }
          break
        
        case 'left':
          if (snakePositionX <= 0) {
            setSnakePositionX(fieldWithCreature)
            
          } else {
            setSnakePositionX(prev => prev - creatureSize)
          }
          break
        
        case 'top':
          if (snakePositionY <= 0) {
            setSnakePositionY(fieldWithCreature)
          } else {
            setSnakePositionY(prev => prev - creatureSize)
          }
          break
      }
      
      if (snakePositionX === foodPositionX && snakePositionY === foodPositionY) {
        setSnakeLength(prev => prev + 1)
        setFoodRandomPosition()
      }
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateCanvas()
    }, stepDelay)
    return () => clearInterval(interval)
  }, [updateCanvas])
  
  const handleKeyDown = (event: any) => {
    switch (event.code) {
      case 'ArrowRight':
        setDirection('right')
        break
      case 'ArrowDown':
        setDirection('bottom')
        break
      case 'ArrowLeft':
        setDirection('left')
        break
      case 'ArrowUp':
        setDirection('top')
        break
      default:
        console.log(event.code)
    }
  }
  
  function generateRandomPosition() {
    return Math.floor(Math.random() * fieldWithCreature / creatureSize) * creatureSize
  }
  
  function setFoodRandomPosition() {
    setFoodPositionX(generateRandomPosition())
    setFoodPositionY(generateRandomPosition())
  }
  
  function focusCanvas() {
    canvas.current.focus()
  }
  
  useEffect(() => {
    focusCanvas()
  }, [])
  
  function startGame() {
    if (!start) {
      setStart(true)
      setSnakeLength(1)
      setFoodRandomPosition()
    }
  }
  
  function pauseGame() {
    setStart(false)
  }
  
  function removeGame() {
    pauseGame()
    
  }
  
  return (
    <div onClick={focusCanvas} className='w-full h-screen flex items-center justify-evenly'>
      <canvas tabIndex={0} onKeyDown={handleKeyDown} className='bg-gray-300 border-gray-900 border-2' ref={canvas}
              width='600' height='600' />
      <p className='max-w-[200px] w-full text-2xl'>Размер &#128013;: {snakeLength}</p>
      <div className='flex gap-2'>
        <button className='bg-emerald-400 px-4 py-2 rounded outline-0' onClick={startGame}>Старт</button>
        <button className='bg-yellow-400 px-4 py-2 rounded outline-0' onClick={pauseGame}>Пауза</button>
        <button className='bg-blue-400 px-4 py-2 rounded outline-0' onClick={setFoodRandomPosition}>Еда</button>
      </div>
    </div>
  )
}

export default App
