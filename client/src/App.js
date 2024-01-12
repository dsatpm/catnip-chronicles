import { Outlet } from'react-router-dom';
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground';
import './app.scss';


function App() {
	return (
		<>
		<section className='app'>
			<ParallaxBackground />
			<Outlet />
		</section>
		</>
	);
}

export default App;
