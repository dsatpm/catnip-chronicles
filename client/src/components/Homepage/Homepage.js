import './homepage.scss';
import { Link } from'react-router-dom';




const Homepage = () => {
	return (
		<>
			<section className='homepage'>
				<div className='text-container'>
					<h1>Catnip Chronicles</h1>
					<div className='nav-container'>
					<Link to='/login' className='nav-link'>Login</Link>
					<Link to='/signup' className='nav-link'>Signup</Link>
					<Link id='buttonInstall' className='nav-link'>Install</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Homepage;
