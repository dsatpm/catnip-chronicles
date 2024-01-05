import { useRef, useEffect } from 'react';

const GameCanvas = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// game rendering logic here

		return () => {
			// cleanup logic here
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className='game-canvas'
		/>
	);
};

export default GameCanvas;
