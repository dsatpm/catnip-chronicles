import { useRef, useEffect } from 'react'
// import initializeGame  from '../GameLogic/index';

const Canvas = props => {
  
  const { draw, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // initializeGame(canvas, context); 

    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      if (typeof draw === 'function') {
        draw(context, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas