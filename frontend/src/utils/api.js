//the code sets up an Axios instance (api here) to make HTTP requests to a backend API. This instance can then be imported and used to make API requests throughout the application.
import axios from 'axios';
const local_api = 'http://localhost:3000';
const production_api = 'https://design-doodle.vercel.app/';

//retrieves an authentication token from the browser's local storage
const token = localStorage.getItem('canva_token');

//creating a new instance of axios for custom configuration like baseUrl and auth headers. This allows us to reuse the provided configuration for all the calls made by that particular instance.
const api = axios.create({
	baseURL: production_api,
	// baseURL: local_api,
	headers: {
		Authorization: token ? `Bearer ${token}` : '',
	},
	//This enables sending cookies along with cross-origin requests. It allows the browser to include cookies in requests to the backend server.
	withCredentials: true,
});

export default api;
