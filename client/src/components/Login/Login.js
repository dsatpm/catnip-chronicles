import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		try {
			const res = await axios.post('http://localhost:5000/auth/login', {
				username,
				password,
			});
			console.log(res);
			navigate('/game');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<section
				id='login'
				className='login'>
				<div className='form-container'>
					<form onSubmit={handleSubmit}>
						<h2>Begin Adventure</h2>
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
						<button type='submit'>Login</button>
						<p>
							Don't have an account?{' '}
							<Link to='/signup'>Signup</Link>
						</p>
					</form>
				</div>
			</section>
		</>
	);
};

export default Login;
