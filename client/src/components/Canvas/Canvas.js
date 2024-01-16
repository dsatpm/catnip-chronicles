import { useRef, useEffect } from 'react'
import Player from '../GameLogic/Player';
import Platform from '../GameLogic/Platform';
import { CANVAS_SIZE_X, CANVAS_SIZE_Y } from '../../constants/canvas';

const Canvas = (props) => {
	const canvasRef = useRef(null);
	let scrollOffset = 0;
	
	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		canvas.width = CANVAS_SIZE_X
		canvas.height = CANVAS_SIZE_Y;
		let animationFrameId;

		const player = new Player();

		const platforms = [
			new Platform(1400, 200, 12, 10000, false),
			new Platform(1400, 513, 29, 420, false),
			new Platform(1530, 487, 29, 20, false),
			new Platform(1557, 472, 29, 20, false),
			new Platform(1582, 462, 29, 20, false),
			new Platform(1607, 449, 29, 72, false),
			new Platform(1684, 462, 29, 20, false),
			new Platform(1710, 472, 29, 20, false),
			new Platform(1736, 487, 29, 20, false),
			new Platform(1827, 487, 12, 30, false),
			new Platform(1878, 462, 12, 30, false),
			new Platform(1929, 436, 12, 30, false),
			new Platform(1827, 487, 12, 30, false),
			new Platform(1993, 449, 12, 30, false),
			new Platform(2057, 462, 12, 30, false),
			new Platform(2108, 486, 12, 30, false),
			new Platform(2145, 512, 12, 380, false),
			new Platform(2249, 486, 12, 60, false),
			new Platform(2312, 473, 12, 210, false),
			new Platform(2338, 334, 12, 70, false),
			new Platform(2362, 449, 12, 20, false),
			new Platform(2428, 372, 12, 70, false),
			new Platform(2428, 449, 12, 20, false),
			new Platform(2453, 423, 12, 70, false),
			new Platform(2454, 295, 12, 145, false),
			new Platform(2633, 346, 12, 70, false),
			new Platform(2658, 512, 12, 658, false),
			new Platform(2734, 397, 12, 45, false),
			new Platform(2811, 435, 12, 45, false),
			new Platform(2954, 475, 10, 340, false),
			new Platform(3336, 500, 12, 32, false),
			new Platform(3400, 510, 12, 300, false),
			new Platform(3400, 487, 12, 32, false),
			new Platform(3438, 462, 12, 32, false),
			new Platform(3477, 435, 12, 32, false),
			new Platform(3516, 410, 12, 108, false),
			new Platform(3630, 435, 12, 32, false),
			new Platform(3669, 462, 12, 32, false),
			new Platform(3708, 487, 12, 32, false),
			new Platform(3746, 513, 12, 32, false),
			new Platform(3748, 538, 12, 32, false),
			new Platform(3820, 600, 12, 32, false),
			new Platform(3899, 600, 12, 32, false),
			new Platform(3976, 600, 12, 32, false),
			new Platform(4053, 588, 12, 32, false),
			new Platform(4091, 576, 12, 32, false),
			new Platform(4130, 564, 12, 32, false),
			new Platform(4206, 538, 12, 32, false),
			new Platform(4244, 525, 12, 32, false),
			new Platform(4284, 512, 12, 390, false),
			new Platform(4320, 440, 5, 40, true),
			new Platform(4445, 440, 5, 40, true),
			new Platform(4500, 486, 12, 24, false),
			new Platform(4525, 483, 5, 22, true),
			new Platform(4550, 460, 12, 24, false),
			new Platform(4575, 455, 5, 22, true),
			new Platform(4600, 462, 12, 38, false),
			new Platform(4635, 462, 12, 40, false),
			new Platform(4705, 512, 12, 20, false),
			new Platform(4757, 512, 12, 20, false),
			new Platform(4809, 512, 12, 430, false),
			new Platform(4845, 494, 30, 10, true),
			new Platform(4859, 486, 30, 20, false),
			new Platform(4884, 474, 40, 20, false),
			new Platform(4910, 462, 50, 20, false),
			new Platform(4936, 448, 70, 20, false),
			new Platform(4961, 435, 80, 72, false),
			new Platform(5038, 448, 70, 20, false),
			new Platform(5063, 462, 50, 20, false),
			new Platform(5089, 474, 40, 20, false),
			new Platform(5115, 486, 30, 20, false),
			new Platform(5140, 490, 30, 42, true),
		];

		let backgroundImage = new Image();
		backgroundImage.src = '../../assets/level1.png';
		let offsetX = 1400;

		const bg = () => {
			const bgX = (-scrollOffset + offsetX) % backgroundImage.width;
			context.clearRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
			context.drawImage(backgroundImage, bgX, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
		}

		const renderPlatforms = () => {
			platforms.forEach((platform) => {
				platform.draw(context);
			});
		};

		const renderPlayer = () => {
			player.update(context);
			player.draw(context);
		}

		//Our draw came here
		const render = () => {
			context.clearRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
			bg();
			renderPlatforms();
			renderPlayer();
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			{...props}
		/>
	);
};

export default Canvas;