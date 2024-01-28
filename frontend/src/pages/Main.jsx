import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { BsGrid1X2, BsFillImageFill, BsFolder } from 'react-icons/bs';
import { FaShapes, FaCloudUploadAlt } from 'react-icons/fa';
// import { TfiText } from 'react-icons/tfi';
import { MdKeyboardArrowLeft } from 'react-icons/md';
// import { RxTransparencyGrid } from 'react-icons/rx';
import MyImages from '../components/MyImages';
import CreateComponent from '../components/CreateComponent';
import api from '../utils/api';

const Main = () => {
	const { design_id } = useParams();
	const [state, setState] = useState('');
	const [current_component, setCurrentComponent] = useState('');
	const [color, setColor] = useState('');
	const [image, setImage] = useState('');
	const [rotate, setRotate] = useState(0);
	const [left, setLeft] = useState('');
	const [top, setTop] = useState('');
	const [width, setWidth] = useState('');
	const [height, setHeight] = useState('');
	const [opacity, setOpacity] = useState('');
	const [zIndex, setzIndex] = useState('');

	const [padding, setPadding] = useState('');
	const [font, setFont] = useState('');
	const [weight, setWeight] = useState('');
	const [text, setText] = useState('');
	const [radius, setRadius] = useState(0);

	const [show, setShow] = useState({
		status: true,
		name: '',
	});

	//a design will have multiple components. By default this is one component
	const [components, setComponents] = useState([
		{
			name: 'main_frame',
			type: 'rect',
			id: Math.floor(Math.random() * 100 + 1),
			height: 450,
			width: 650,
			z_index: 1,
			color: '#fff',
			image: '',
			setCurrentComponent: (a) => setCurrentComponent(a),
		},
	]);

	const setElements = (type, name) => {
		setState(type);
		setShow({
			// should it be status??????????
			state: false,
			name,
		});
	};

	// function enables users to move an element by dragging it. It dynamically updates the element's position as the mouse moves and sets the final position when the mouse is released.
	const moveElement = (id, currentInfo) => {
		// Set the current component to the one being moved
		setCurrentComponent(currentInfo);
		let isMoving = true;
		// Get the DOM element of the target component by its ID
		const currentDiv = document.getElementById(id);

		const mouseMove = ({ movementX, movementY }) => {
			// Get the computed style of the target element
			const getStyle = window.getComputedStyle(currentDiv);
			// Extract the current left and top positions of the element
			const left = parseInt(getStyle.left);
			const top = parseInt(getStyle.top);
			// If moving is in progress, update the left and top positions based on mouse movement
			if (isMoving) {
				currentDiv.style.left = `${left + movementX}px`;
				currentDiv.style.top = `${top + movementY}px`;
			}
		};

		const mouseUp = (e) => {
			isMoving = false;
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', mouseUp);
			// Update the left and top state variables with the final values after moving
			setLeft(parseInt(currentDiv.style.left));
			setTop(parseInt(currentDiv.style.top));
		};
		// Add event listeners for mouse movement and release
		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', mouseUp);
	};

	// function allows users to resize an element by dragging its edges. It dynamically updates the width and height of the element as the mouse moves and sets the final dimensions when the mouse is released.
	const resizeElement = (id, currentInfo) => {
		// Set the current component to the one being resized
		setCurrentComponent(currentInfo);
		let isMoving = true;
		// Get the DOM element of the target component by its ID
		const currentDiv = document.getElementById(id);

		const mouseMove = ({ movementX, movementY }) => {
			// Get the computed style of the target element
			const getStyle = window.getComputedStyle(currentDiv);
			// Extract the current width and height of the element
			const width = parseInt(getStyle.width);
			const height = parseInt(getStyle.height);
			// If resizing is in progress, update the width and height based on mouse movement
			if (isMoving) {
				currentDiv.style.width = `${width + movementX}px`;
				currentDiv.style.height = `${height + movementY}px`;
			}
		};

		const mouseUp = (e) => {
			isMoving = false;
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', mouseUp);
			// Update the width and height state variables with the final values after resizing
			setWidth(parseInt(currentDiv.style.width));
			setHeight(parseInt(currentDiv.style.height));
		};

		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', mouseUp);
	};

	// function allows users to rotate an element by dragging the mouse. It dynamically updates the rotation angle of the element as the mouse moves and sets the final angle when the mouse is released.
	const rotateElement = (id, currentInfo) => {
		// Clear the current selected component
		setCurrentComponent('');
		// Set the current component to the one being rotated
		setCurrentComponent(currentInfo);

		// Get the DOM element of the target component by its ID
		const target = document.getElementById(id);

		//function handles rotation of a component
		const mouseMove = ({ movementX, movementY }) => {
			//The getComputedStyle() method returns an object containing the values of all CSS properties of an element
			const getStyle = window.getComputedStyle(target);
			// Extract the transformation matrix from the computed style
			const trans = getStyle.transform;
			const values = trans.split('(')[1].split(')')[0].split(',');
			// Calculate the current angle of rotation
			const angle = Math.round(
				Math.atan2(values[1], values[0]) * (180 / Math.PI)
			);
			// Update the angle based on mouse movement
			let deg = angle < 0 ? angle + 360 : angle;
			if (movementX) {
				deg = deg + movementX;
			}
			// Apply the new rotation angle to the target element
			target.style.transform = `rotate(${deg}deg)`;
		};
		const mouseUp = (e) => {
			// Remove event listeners for mouse movement and release
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', mouseUp);

			// Get the final computed style of the target element after rotation
			const getStyle = window.getComputedStyle(target);
			const trans = getStyle.transform;
			const values = trans.split('(')[1].split(')')[0].split(',');
			const angle = Math.round(
				Math.atan2(values[1], values[0]) * (180 / Math.PI)
			);
			let deg = angle < 0 ? angle + 360 : angle;
			// Set the final rotation angle in state
			setRotate(deg);
		};

		// Add event listeners for mouse movement and release
		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', mouseUp);
	};

	const removeComponent = (id) => {
		////a temporary array of components that are currently not selected
		const temp = components.filter((c) => c.id !== id);
		// Clear the current selected component (if any)
		setCurrentComponent('');
		setComponents(temp);
	};

	//function removes the background image from the currently selected component and updates the state accordingly.
	const remove_background = () => {
		//finds the currently selected component from the components array using its ID.
		const com = components.find((c) => c.id === current_component.id);
		//a temporary array of components that are currently not selected
		const temp = components.filter((c) => c.id !== current_component.id);
		// Clear the image property of the currently selected component
		com.image = '';
		setImage('');
		//It sets the components state by adding back the modified currently selected component (with the cleared background image) to the filtered array of components.
		setComponents([...temp, com]);
	};

	const opacityHandle = (e) => {
		setOpacity(parseFloat(e.target.value));
	};

	//this function is responsible for creating a new shape component with predefined initial properties and adding them to the list of existing components.
	const createShape = (name, type) => {
		// Define initial style properties for the shape
		const style = {
			id: Date.now(),
			name: name,
			type,
			left: 10,
			top: 10,
			opacity: 1,
			width: 200,
			height: 150,
			rotate,
			z_index: 2,
			color: '#3c3c3d',
			setCurrentComponent: (a) => setCurrentComponent(a),
			moveElement,
			resizeElement,
			rotateElement,
		};
		// Update the components state by adding the new shape style-> basically we are adding a new shape component to this array
		setComponents([...components, style]);
	};

	//this function is responsible for creating a new image component with predefined initial properties and adding them to the list of existing components.
	const add_image = (img) => {
		setCurrentComponent('');
		// Define initial style properties for the image component
		const style = {
			id: Date.now(),
			name: 'image',
			type: 'image',
			left: 10,
			top: 10,
			opacity: 1,
			width: 200,
			height: 150,
			rotate,
			z_index: 2,
			ratius: 0,
			image: img,
			setCurrentComponent: (a) => setCurrentComponent(a),
			moveElement,
			resizeElement,
			rotateElement,
		};

		setCurrentComponent(style);
		// Update the components state by adding the new image style-> basically we are adding a new image component to this array
		setComponents([...components, style]);
	};

	//This useEffect hook is responsible for updating the properties of the current component in response to changes in certain state variables.
	useEffect(() => {
		if (current_component) {
			//finds the index of the current component in the components array.
			const index = components.findIndex(
				(c) => c.id === current_component.id
			);
			//creating a temporary array temp by filtering out the current component from the components array.
			const temp = components.filter(
				(c) => c.id !== current_component.id
			);

			if (current_component.name !== 'text') {
				components[index].width = width || current_component.width;
				components[index].height = height || current_component.height;
				components[index].rotate = rotate || current_component.rotate;
			}
			// if (current_component.name === 'text') {
			// 	components[index].font = font || current_component.font;
			// 	components[index].padding =
			// 		padding || current_component.padding;
			// 	components[index].weight = weight || current_component.weight;
			// 	components[index].title = text || current_component.title;
			// }
			if (current_component.name === 'image') {
				components[index].radius = radius || current_component.radius;
			}

			if (current_component.name === 'main_frame' && image) {
				components[index].image = image || current_component.image;
			}
			components[index].color = color || current_component.color;

			if (current_component.name !== 'main_frame') {
				components[index].left = left || current_component.left;
				components[index].top = top || current_component.top;
				components[index].opacity =
					opacity || current_component.opacity;
				components[index].z_index = zIndex || current_component.z_index;
			}
			//It sets the updated components array by combining the filtered temp array and the updated current component.
			setComponents([...temp, components[index]]);

			setColor('');
			setWidth('');
			setHeight('');
			setTop('');
			setLeft('');
			setRotate(0);
			setOpacity('');
			setzIndex('');
			setText('');
		}
	}, [
		color,
		image,
		left,
		top,
		width,
		height,
		opacity,
		zIndex,
		padding,
		font,
		weight,
		text,
		radius,
	]);

	//This useEffect hook is triggered whenever the design_id changes. the hook fetches design data associated with the current design_id, augments each design item with necessary functions, and sets the state with the updated design data.
	useEffect(() => {
		const get_design = async () => {
			try {
				const { data } = await api.get(`/api/user-design/${design_id}`);
				console.log(data);
				//design is an array of components
				const { design } = data;

				//For each item in the design array (ie each component), certain properties and functions are added
				for (let i = 0; i < design.length; i++) {
					design[i].setCurrentComponent = (a) =>
						setCurrentComponent(a);
					design[i].moveElement = moveElement;
					design[i].resizeElement = resizeElement;
					design[i].rotateElement = rotateElement;
					design[i].remove_background = remove_background;
				}
				//After augmenting each component with the necessary functions and properties, the updated design array is set as the state using setComponents.
				setComponents(design);
			} catch (error) {
				console.log(error);
			}
		};
		get_design();
	}, [design_id]);

	return (
		<div className="min-w-screen h-screen bg-black">
			<Header components={components} design_id={design_id} />
			<div className="flex h-[calc(100%-60px)] w-screen">
				<div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
					{/* shapes sidebar */}
					<div
						onClick={() => setElements('shape', 'shape')}
						className={`${
							show.name === 'shape' ? 'bg-[#252627]' : ''
						} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
					>
						<span className="text-2xl">
							<FaShapes />
						</span>
						<span className="text-xs font-medium">Shapes</span>
					</div>

					{/* upload sidebar */}
					<div
						onClick={() => setElements('image', 'uploadImage')}
						className={`${
							show.name === 'uploadImage' ? 'bg-[#252627]' : ''
						} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
					>
						<span className="text-2xl">
							<FaCloudUploadAlt />
						</span>
						<span className="text-xs font-medium">Upload</span>
					</div>
				</div>
				<div className="h-full w-[calc(100%-75px)]">
					<div
						className={`${
							show.status
								? 'p-0 -left-[350px]'
								: 'px-8 left-[75px] py-5'
						} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
					>
						<div
							onClick={() => setShow({ name: '', status: true })}
							className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
						>
							<MdKeyboardArrowLeft />
						</div>
						{/* sidebar options for 3 shapes - rect, circle and triangle*/}
						{state === 'shape' && (
							<div className="grid grid-cols-3 gap-2">
								{/* rectangle shape */}
								<div
									onClick={() => createShape('shape', 'rect')}
									className="h-[90px] bg-[#3c3c3d] cursor-pointer"
								></div>
								{/* circle shape */}
								<div
									onClick={() =>
										createShape('shape', 'circle')
									}
									className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
								></div>
								{/* triangle shape */}
								<div
									onClick={() =>
										createShape('shape', 'triangle')
									}
									style={{
										clipPath:
											'polygon(50% 0,100% 100%,0 100%)',
									}}
									className="h-[90px] bg-[#3c3c3d] cursor-pointer"
								></div>
							</div>
						)}
						{/* sidebar options for images - upload button + list of existing images uploaded by user */}
						{state === 'image' && (
							<MyImages add_image={add_image} />
						)}
					</div>

					{/* container div to contain the design (and all of its components) and right sidebar for options */}
					<div className="w-full flex h-full">
						{/* If current_component is falsy (null or undefined), the width is set to 100%. The right sidebar will not be shown */}
						<div
							className={`flex justify-center relative items-center h-full ${
								!current_component
									? 'w-full'
									: 'w-[calc(100%-250px)] overflow-hidden'
							}`}
						>
							{/* this div will contain the design and all of its components */}
							<div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
								<div
									id="main_design"
									className="w-auto relative h-auto overflow-hidden"
								>
									{/* This maps over the components array and renders a CreateComponent for each component. */}
									{components.map((c, i) => (
										<CreateComponent
											key={i}
											info={c}
											current_component={
												current_component
											}
											removeComponent={removeComponent}
										/>
									))}
								</div>
							</div>
						</div>
						{/* if current_component is true, then we show right sidebar */}
						{current_component && (
							<div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
								<div className="flex gap-6 flex-col items-start h-full px-3 justify-start">
									{/* every component will have a color option */}
									<div className="flex gap-4 justify-start items-start mt-4">
										<span>Color : </span>
										<label
											className="w-[30px] h-[30px] cursor-pointer rounded-sm"
											style={{
												background: `${
													current_component.color &&
													current_component.color !==
														'#fff'
														? current_component.color
														: 'gray'
												}`,
											}}
											htmlFor="color"
										></label>
										<input
											onChange={(e) =>
												setColor(e.target.value)
											}
											type="color"
											className="invisible"
											id="color"
										/>
									</div>
									{/* for bg image, we provide remove bg option */}
									{current_component.name === 'main_frame' &&
										current_component.image && (
											<div>
												<button
													className="p-[6px] bg-slate-700 text-white rounded-sm"
													onClick={remove_background}
												>
													Remove background
												</button>
											</div>
										)}

									{current_component.name !==
										'main_frame' && (
										<div className="flex gap-6 flex-col">
											{/* for components other than main frame, show opacity option */}
											<div className="flex gap-1 justify-start items-start">
												<span className="text-md w-[70px]">
													Opacity :{' '}
												</span>
												<input
													onChange={opacityHandle}
													className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
													type="number"
													step={0.1}
													min={0.1}
													max={1}
													value={
														current_component.opacity
													}
												/>
											</div>
											{/* for components other than main frame, show z index option */}
											<div className="flex gap-1 justify-start items-start">
												<span className="text-md w-[70px]">
													Z-Index :{' '}
												</span>
												<input
													onChange={(e) =>
														setzIndex(
															parseInt(
																e.target.value
															)
														)
													}
													className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
													type="number"
													step={1}
													value={
														current_component.z_index
													}
												/>
											</div>
											{/* for image comp, show radius option */}
											{current_component.name ===
												'image' && (
												<div className="flex gap-1 justify-start items-start">
													<span className="text-md w-[70px]">
														Radius :{' '}
													</span>
													<input
														onChange={(e) =>
															setRadius(
																parseInt(
																	e.target
																		.value
																)
															)
														}
														className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
														type="number"
														step={1}
														value={
															current_component.radius
														}
													/>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
