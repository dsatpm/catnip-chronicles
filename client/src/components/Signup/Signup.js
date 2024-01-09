import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.scss';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		try {
			const res = await axios.post('http://localhost:5000/auth/signup', {
				username,
				password,
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<section className='signup'>
				<form onSubmit={handleSubmit}>
					<h2>Signup</h2>
					<input
						type='username'
						placeholder='Create Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						type='password'
						placeholder='Create Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type='submit'>
						<span>Signup</span>
						</button>
						<p>
							Already have an account? <Link to='/login'>Login</Link>
						</p>
				</form>
			</section>
		</>
	);
};

export default Signup;
