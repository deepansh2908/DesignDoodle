import React, { useEffect, useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useLocation, useNavigate } from 'react-router-dom';
import RotateLoader from 'react-spinners/RotateLoader';
import api from '../utils/api';

import CreateComponent from './CreateComponent';

const CreateDesign = () => {
	const ref = useRef();

	//contains state data passed from the previous location (see Layout.jsx)
	const { state } = useLocation();

	const navigate = useNavigate();

	const obj = {
		name: 'main_frame',
		type: 'rect',
		id: Date.now(),
		height: state.height,
		width: state.width,
		z_index: 1,
		color: '#fff',
		image: '',
	};

	const [loader, setLoader] = useState(false);

	//function orchestrates the process of creating a new design. It converts the design component into an image, sends the image data along with information about the design properties to the server via a POST request, and redirects the user to the edit page of the newly created design upon success.
	const create_design = async () => {
		//convert the DOM element referenced by ref (which is the design component) into a Blob object representing an image
		const image = await htmlToImage.toBlob(ref.current);

		const design = JSON.stringify(obj);

		//if image conversion was successful.
		if (image) {
			//Creating a new FormData object to send as the payload of the POST request.
			const formData = new FormData();
			formData.append('design', design);
			formData.append('image', image);
			try {
				setLoader(true);
				const { data } = await api.post(
					'/api/create-user-design',
					formData
				);
				navigate(`/design/${data.design._id}/edit`);
				setLoader(false);
			} catch (error) {
				setLoader(false);
				console.log(error.response.data);
			}
		}
	};

	//the function inside the useEffect hook will be executed whenever state or ref changes.
	useEffect(() => {
		//if state is truthy and there is a valid reference to the DOM element
		if (state && ref.current) {
			create_design();
		} else {
			navigate('/');
		}
	}, [state, ref]);
	return (
		<div className="w-screen h-screen flex justify-center items-center relative">
			<div ref={ref} className="relative w-auto h-auto overflow-auto">
				<CreateComponent info={obj} current_component={{}} />
			</div>
			{/* conditionally renders a loading spinner depending on the loader state variable */}
			{loader && (
				<div className="left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute">
					<RotateLoader color="white" />
				</div>
			)}
		</div>
	);
};

export default CreateDesign;
