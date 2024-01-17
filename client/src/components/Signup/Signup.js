import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.scss';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		try {
			const res = await axios.post('https://catnip-chronicles.onrender.com/auth/signup', {
				username,
				password,
			});
			console.log(res);
			navigate('/login');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<section
				id='signup'
				className='signup'>
				<div className='form-container'>
					<form onSubmit={handleSubmit}>
						<h2>Adventure Awaits!</h2>
						<input
							type='username'
							placeholder='Create Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete='off'
							required
						/>
						<input
							type='password'
							placeholder='Create Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='off'
							required
						/>
						<button type='submit'>Signup</button>
						<p>
							Already have an account?{' '}
							<Link to='/login'>Login</Link>
						</p>
					</form>
				</div>
			</section>
		</>
	);
};

export default Signup;
