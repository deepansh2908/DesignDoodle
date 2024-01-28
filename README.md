## What is DesignDoodle?

-This is a canva type web application that allows users to insert shapes (rectangle, circle, triangle) and upload images to make their own canvas template. 
-Users can fill in color in chosen shape. There are options for assigning opacity and z-index as well. 
-Similarly for uploaded images, there are options for opacity, z-index, radius to modify the image. 
-Shapes and images are resizable, rotatable, and movable.
-Once user is done designing their template, it can save the template and also download the template in png format.
-Saved templates will be shown under Projects section and can be reused.

## Tech Stack?

-JS, React, Tailwind CSS for frontend
-Nodejs, Express for backend
-MongoDB as the database
-Cloudinary for uploading images

## Documentation for API endpoints
-POST /api/create-user-design   Creates a new design in the database
-GET /api/user-design/:design_id   retreives a specific user design 
-PUT /api/update-user-design/:design_id   updates a specific user design
-POST /api/add-user-image   uploads the image to cloudinary and stores its url in database
-GET /api/get-user-image   gets all the images uploaded by the user
-PUT /api/delete-user-image/:design_id   deletes a specific design
-GET /api/user-designs   gets all the designs created by user
-POST /api/user-register   registers a new user
-POST /api/user-login   for user login

