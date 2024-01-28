import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
//provides animated notification pop-up that is small and nonblocking
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<App />
		<Toaster />
	</>
);
