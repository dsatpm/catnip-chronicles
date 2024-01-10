import './App.css';
import { Outlet } from'react-router-dom';


function App() {
	return (
		<>
		<section className='app'>
			<Outlet />
		</section>
		</>
	);
}

export default App;
