import './game.scss';
import { useEffect } from 'react';

const Game = ({ user }) => {
	useEffect(() => {
		if (user) {
			const script = document.createElement('script');
			script.src = '../GameCanvas/index.js';
			script.async = true;
			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			};
		}
	}, [user]);
	return <>{user && <section className='game'></section>}</>;
};

export default Game;
