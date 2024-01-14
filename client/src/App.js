import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
// import Game from './components/Game/Game';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import WrongPage from './components/WrongPage/WrongPage';
import './app.scss';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				{/* <Route
					path='/game'
					element={<Game />}
				/> */}
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='*'
					element={<WrongPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
