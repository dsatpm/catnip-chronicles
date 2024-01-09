import './homepage.scss';
import { Link } from 'react-router-dom';

const Homepage = () => {
	return (
		<>
			<section className='homepage'>
				<div className='text-container'>
					<h1>Catnip Chronicles</h1>
					<div className='nav-container'>
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Signup</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Homepage;
