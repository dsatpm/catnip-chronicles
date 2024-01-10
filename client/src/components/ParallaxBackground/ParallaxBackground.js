import './parallax-bg.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const headerVariants = {
	initial: {
		y: '75px',
		opacity: 0,
	},

	animate: {
		y: '0',
		opacity: 1,
		transition: {
			delay: 0.4,
			duration: 0.75,
		},
	},
};

const ParallaxBackground = () => {
	const ref = useRef();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	const yText = useTransform(scrollYProgress, [0, 1], ['0%', '400%']);
	const yBg1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
	const yBg2 = useTransform(scrollYProgress, [0, 1], ['0%', '125%']);
	return (
		<>
			<div
				className='parallax-bg'
				ref={ref}>
				<motion.h1
					variants={headerVariants}
					initial='initial'
					animate='animate'
					style={{ y: yText }}
					className='header'>
					Catnip Chronicles
				</motion.h1>
				<motion.div
					style={{ y: yBg1 }}
					className='bg2'></motion.div>
				<motion.div
					style={{ y: yBg2 }}
					className='bg1'></motion.div>
			</div>
		</>
	);
};

export default ParallaxBackground;
