import './home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<section
				id='homepage'
				className='homepage'>
				<div className='text-container'>
					<div className='wrapper'>
						<h1>Welcome!</h1>
						<h2>
							To the best pixelated 2D platformer ever made in 2
							weeks (or less) by a small group of really cool,
							really hire-able junior developers.
						</h2>
						<p>
							We used React, Node, Express, and MongoDb (MERN) to
							create this hecka fun game. We sincerely hope you
							find it charming and enjoyable! Click one of the
							buttons below to get yourself started. Obviously, if
							you've never been here before, go ahead and sign up
							for a new account (it's FREE!) and start playing! If
							you love the game so much, you can even download it
							to play on your local machine, or if you ever lose
							internet service or whatever. We're not your mom,
							we're not your dad. Live your own life and have fun!
						</p>
					</div>
					<div className='nav-container'>
						<Link
							to='/login'
							className='nav-link'>
							Login
						</Link>
						<Link
							to='/signup'
							className='nav-link'>
							Signup
						</Link>
						<Link
							id='buttonInstall'
							className='nav-link'>
							Install
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
