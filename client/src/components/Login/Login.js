import { useState } from 'react';
import axios from 'axios';
import './login.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
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
				<form>
					<h2>Login</h2>
					<input
						type='username'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type='submit'
						onClick={handleSubmit}>
						Login
					</button>
				</form>
			</section>
		</>
	);
};

export default Login;
