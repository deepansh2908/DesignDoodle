//Navigate is used to handle redirection or navigation when certain conditions are met. In this case, depending on userInfo. It's a convenient way to handle conditional routing within React Router.
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';
import Index from './pages/Index';
import Layout from './pages/Layout';
import Home from './components/Home';
import Projects from './components/Projects';
import CreateDesign from './components/CreateDesign';
import Main from './pages/Main';
import { token_decode } from './utils/index';

//Retrieves an authentication token from local storage using localStorage.getItem('canva_token') and decodes it using a function called token_decode from ./utils/index. This retrieves user information from the token, if available.
const userInfo = token_decode(localStorage.getItem('canva_token'));
//console.log(userInfo);

const router = createBrowserRouter([
	{
		path: '/',
		element: userInfo ? <Layout /> : <Index />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
		],
	},
	{
		path: '/design/create',
		element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
	},
	{
		path: '/design/:design_id/edit',
		element: userInfo ? <Main /> : <Navigate to="/" />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
