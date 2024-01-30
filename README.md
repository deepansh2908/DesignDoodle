## What is DesignDoodle?

* This is a canva type web application that allows users to insert shapes (rectangle, circle, triangle) and upload images to make their own canvas template. 
* Users can fill in color in chosen shape. There are options for assigning opacity and z-index as well. 
* Similarly for uploaded images, there are options for opacity, z-index, radius to modify the image. 
* Shapes and images are resizable, rotatable, and movable.
* Once user is done designing their template, it can save the template and also download the template in png format.
* Saved templates will be shown under Projects section and can be reused.

## Tech Stack?

* JS, React, Tailwind CSS for frontend
* Nodejs, Express for backend
* MongoDB as the database
* Cloudinary for uploading images

## Documentation for API endpoints (CRUD operations)
* POST /api/create-user-design     creates a new design in the database
* GET /api/user-design/:design_id     retreives a specific user design 
* PUT /api/update-user-design/:design_id     updates a specific user design
* POST /api/add-user-image     uploads the image to cloudinary and stores its url in database
* GET /api/get-user-image     gets all the images uploaded by the user
* PUT /api/delete-user-image/:design_id     deletes a specific design
* GET /api/user-designs     gets all the designs created by user
* POST /api/user-register     registers a new user
* POST /api/user-login     for user login

## Want to try it out?
* https://design-doodle.vercel.app/ (Work in progress)
* Or just clone the repo on your machine and run this command in VS Code terminal (while in root directory) -> 'npm run dev'

## Live video demo



https://github.com/deepansh2908/DesignDoodle/assets/133380229/05d8c10f-691f-4fc3-ae04-c2172f2aa809



