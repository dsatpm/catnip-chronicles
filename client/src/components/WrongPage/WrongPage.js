import './wrong-page.scss';
import { Link } from 'react-router-dom';

const WrongPage = () => {
	return (
		<>
			<section className='wrong-page'>
				<div className='wrapper'>
					<h1>Error 404 ~</h1>
					<h2>You caught me taking a cat nap...</h2>
					<Link to='/'>Go back to the homepage.</Link>
				</div>
			</section>
		</>
	);
};

export default WrongPage;
