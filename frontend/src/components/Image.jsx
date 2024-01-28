import React from 'react';

// this component generates a grid of images based on the images prop. Each image is wrapped in a <div> that includes an onClick event handler to trigger different actions based on the type prop.
const Image = ({ add_image, images, type, setImage }) => {
	return images ? (
		<>
			<div className="grid grid-cols-2 gap-2">
				{/* rendering a div for each image in images array */}
				{images.map((item, i) => (
					<div
						key={i}
						onClick={() =>
							type === 'background'
								? setImage(item.image_url)
								: add_image(item.image_url)
						}
						className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
					>
						<img
							className="w-full h-full object-fill"
							src={item.image_url}
							alt="image"
						/>
					</div>
				))}
			</div>
		</>
	) : (
		<>
			<div>No images present</div>
		</>
	);
};

export default Image;
