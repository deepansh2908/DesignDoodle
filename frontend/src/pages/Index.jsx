import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import api from '../utils/api';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';

const Index = () => {
	//type can be either signin or singup
	const [type, setType] = useState('');
	const [show, setShow] = useState(false);
	const [loader, setLoader] = useState(false);

	//The initial state is an object with three properties: name, email, and password, all initialized to empty strings.
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

	//inputHandle updates the state with the value entered by the user.
	const inputHandle = (e) => {
		setState({
			//an object spread operator used to create a new object by copying the properties of the existing state object.
			...state,
			//This dynamically sets a property in the new state object. e.target.name typically represents the name attribute of the input field, and e.target.value represents the current value of the input field. By using square brackets around e.target.name, the property name is determined dynamically based on the name attribute of the input field.
			[e.target.name]: e.target.value,
		});
	};

	const user_register = async (e) => {
		e.preventDefault();
		try {
			setLoader(true);
			//Makes an async POST request to the /api/user-register endpoint using the api Axios instance.
			//The request payload is the state object, which contains the user's info (name, email, password).
			const { data } = await api.post('/api/user-register', state);
			setLoader(false);
			//Stores the auth token received from the server in the browser's local storage under the key 'canva_token'.
			localStorage.setItem('canva_token', data.token);
			setState({
				name: '',
				email: '',
				password: '',
			});
			window.location.href = '/';
		} catch (error) {
			setLoader(false);
			//Displays an error toast notification
			toast.error(error.response.data.message);
		}
	};

	const user_login = async (e) => {
		e.preventDefault();
		try {
			setLoader(true);
			const { data } = await api.post('/api/user-login', state);
			setLoader(false);
			localStorage.setItem('canva_token', data.token);
			setState({
				email: '',
				password: '',
			});
			window.location.href = '/';
		} catch (error) {
			setLoader(false);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="bg-[#18191b] min-h-screen w-full">
			<div
				className={`w-screen ${
					show ? 'visible opacity-100' : 'invisible opacity-30'
				} transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}
			>
				{/* signup and signin form depending on the type variable */}
				<div className="w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative">
					<div
						onClick={() => setShow(false)}
						className="absolute right-4 top-4 text-xl cursor-pointer text-white"
					>
						<IoMdClose />
					</div>
					<h2 className="text-white pb-4 text-center text-xl">
						Login or Signup in seconds!
					</h2>
					{type === 'signin' && (
						<form onSubmit={user_login}>
							<div className="flex flex-col gap-3 mb-3 text-white">
								<label htmlFor="email">Email</label>
								<input
									//inputHandle updates the state with the value entered by the user.
									onChange={inputHandle}
									type="email"
									name="email"
									id="email"
									placeholder="email"
									value={state.email}
									className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
								/>
							</div>
							<div className="flex flex-col gap-3 mb-3 text-white">
								<label htmlFor="password">Password</label>
								<input
									onChange={inputHandle}
									type="password"
									name="password"
									id="password"
									placeholder="password"
									value={state.password}
									className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
								/>
							</div>
							<div>
								<button
									disabled={loader}
									className="px-3 py-2 rounded-md bg-purple-500 w-full ounline-none hover:bg-purple-600 text-white"
								>
									{loader ? 'loading..' : 'Signin'}
								</button>
							</div>
						</form>
					)}
					{type === 'signup' && (
						<form onSubmit={user_register}>
							<div className="flex flex-col gap-3 mb-3 text-white">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									onChange={inputHandle}
									value={state.name}
									required
									name="name"
									id="name"
									placeholder="name"
									className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
								/>
							</div>
							<div className="flex flex-col gap-3 mb-3 text-white">
								<label htmlFor="email">Email</label>
								<input
									onChange={inputHandle}
									value={state.email}
									type="email"
									name="email"
									id="email"
									placeholder="email"
									className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
									required
								/>
							</div>
							<div className="flex flex-col gap-3 mb-3 text-white">
								<label htmlFor="password">Password</label>
								<input
									onChange={inputHandle}
									type="password"
									name="password"
									id="password"
									placeholder="password"
									value={state.password}
									className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
									required
								/>
							</div>
							<div>
								<button
									disabled={loader}
									className="px-3 py-2 rounded-md bg-purple-500 w-full ounline-none hover:bg-purple-600 text-white"
								>
									{loader ? 'loading..' : 'Sign up'}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
			<div className="bg-[#252627] shadow-md">
				<div className="w-[93%] m-auto py-3">
					<div className="flex justify-between items-center">
						<div className="w-[80px] h-[48px]">
							<img className="w-full h-full" src={logo} alt="" />
						</div>
						<div className="flex gap-4">
							<button
								onClick={() => {
									setType('signin');
									setShow(true);
								}}
								className="py-2 w-[80px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium"
							>
								Sign in
							</button>
							<button
								onClick={() => {
									setType('signup');
									setShow(true);
								}}
								className="py-2 w-[80px] text-center bg-purple-500  text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium"
							>
								Sign up
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-full justify-center items-center p-4">
				<div className="py-[168px] flex justify-center items-center flex-col gap-6">
					<h2 className="text-5xl text-[#c7c5c5] font-bold">
						What will you design today?
					</h2>
					<span className="text-[#aca9a9] text-2xl font-medium">
						DesignDoodle makes it easy to create and share
						professional designs.
					</span>
				</div>
			</div>
		</div>
	);
};

export default Index;
