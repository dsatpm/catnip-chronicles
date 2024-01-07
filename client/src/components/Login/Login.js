import { useState } from 'react';
import axios from 'axios';
import './login.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		try {
			const res = await axios.post('http://localhost:5000/auth/login', {
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
			<section className='login'>
				<form onSubmit={handleSubmit}>
					<h2>Catnip Chronicles</h2>
					<input
						type='username'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete='off'
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='off'
						required
					/>
					<button type='submit'>
						<span>Login</span>
					</button>
				<p>Don't have an account? <a href='/signup'>Signup</a></p>
				</form>
			</section>
		</>
	);
};

export default Login;
