const designController = require('../controllers/designController');

const router = require('express').Router();
const auth = require('../middlewares/middleware');

// Each route specifies an HTTP method and a URL path.
// Middleware auth is applied to each route, ensuring that only authenticated users can access these routes.

// create_user_design function from the designController should be invoked when a POST request is made to the /create-user-design endpoint.
router.post('/create-user-design', auth, designController.create_user_design);
router.get('/user-design/:design_id', auth, designController.get_user_design);
router.put(
	'/update-user-design/:design_id',
	auth,
	designController.update_user_design
);

router.post('/add-user-image', auth, designController.add_user_image);
router.get('/get-user-image', auth, designController.get_user_image);
router.put(
	'/delete-user-image/:design_id',
	auth,
	designController.delete_user_image
);

router.get('/user-designs', auth, designController.get_user_designs);

module.exports = router;
