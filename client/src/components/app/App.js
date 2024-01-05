import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameCanvas from '../GameCanvas/GameCanvas';

function App() {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path='/'>
					{/* Home Page / Sign In */}
				</Route>
				<Route path='/game'>
					<GameCanvas />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
