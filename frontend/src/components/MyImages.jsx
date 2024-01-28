import React, { useEffect, useState } from 'react';
import Image from './Image';
import api from '../utils/api';
import BarLoader from 'react-spinners/BarLoader';
import toast from 'react-hot-toast';

const MyImages = ({ add_image }) => {
	const [images, setImages] = useState([]);
	const [loader, setLoader] = useState(false);
	// function provides a mechanism to upload images, asynchronously, and updates the UI accordingly based on the upload status.
	const image_upload = async (e) => {
		// Check if there are files selected for upload
		if (e.target.files?.length > 0) {
			const formData = new FormData();
			// Append the selected image file to the FormData object
			formData.append('image', e.target.files[0]);

			try {
				setLoader(true);
				const { data } = await api.post(
					'/api/add-user-image',
					formData
				);
				console.log(data);
				// Update the images state with the newly uploaded image
				setImages([...images, data.userImage]);
				setLoader(false);
			} catch (error) {
				setLoader(false);
				toast.error(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		const get_images = async () => {
			try {
				const { data } = await api.get('/api/get-user-image');
				setImages(data.images);
			} catch (error) {
				console.log(error);
			}
		};
		get_images();
	}, []);

	return (
		<div>
			<div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
				<label className="text-center cursor-pointer" htmlFor="image">
					Upload image
				</label>
				<input
					readOnly={loader}
					onChange={image_upload}
					type="file"
					id="image"
					className="hidden"
				/>
			</div>
			{loader && (
				<div className="flex justify-center items-center mb-2">
					<BarLoader color="#fff" />
				</div>
			)}
			<div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
				{/* The Image component is a React component used to display a grid of images. */}
				<Image add_image={add_image} images={images} />
			</div>
		</div>
	);
};

export default MyImages;
