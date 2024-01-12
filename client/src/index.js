import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import WrongPage from './components/NotFound/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <WrongPage />,
		children: [
			{
				index: true,
				element: <Homepage/>
			}, {
				path: '/signup',
				element: <Signup />
			},
			{
					path: '/login',
					element: <Login />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
