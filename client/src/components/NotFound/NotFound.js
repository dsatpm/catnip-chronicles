import './not-found.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<>
			<section className='not-found'>
				<div className='wrapper'>
					<h1>Error 404 ~</h1>
					<h2>You caught me taking a cat nap...</h2>
					<Link to='/'>Go back to the homepage.</Link>
				</div>
			</section>
		</>
	);
};

export default NotFound;
