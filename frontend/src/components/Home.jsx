import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Item from './Home/Item';
import toast from 'react-hot-toast';

const Home = () => {
	const [designs, setDesign] = useState([]);
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mdtablet: {
			breakpoint: { max: 992, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 4,
		},
	};

	const get_user_design = async () => {
		try {
			const { data } = await api.get('/api/user-designs');
			setDesign(data.designs);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		get_user_design();
	}, []);

	const delete_design = async (design_id) => {
		try {
			const { data } = await api.put(
				`/api/delete-user-image/${design_id}`
			);
			toast.success(data.message);
			get_user_design();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="pt-5">
			<div className="w-fll flex justify-center items-center h-[250px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden">
				<div>
					<h2 className="text-3xl pb-10 pt-6 font-semibold text-white">
						What will you design today?
					</h2>
				</div>
			</div>
			<div>
				<h2 className="text-xl py-6 font-semibold text-white">
					Your recent designs
				</h2>
				<div>
					<Carousel
						autoPlay={true}
						infinite={true}
						responsive={responsive}
						transitionDuration={500}
					>
						{/* maps over the designs array using the map function to render each design as an Item component. */}
						{designs.map((d, i) => (
							<Item
								delete_design={delete_design}
								design={d}
								key={i}
							/>
						))}
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default Home;
