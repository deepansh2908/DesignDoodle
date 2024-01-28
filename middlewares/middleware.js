//auth middleware function verifies JWTs sent in the Authorization header of incoming requests. If a valid token is found, it decodes the user information and attaches it to the request object (req.userInfo). If no token is found or if verification fails, it returns a 401 Unauthorized response.
//Middleware functions have access to the request (req) and response (res) objects and can manipulate them as needed. The next parameter is a callback function that, when called, passes control to the next middleware function in the stack.

//jsonwebtoken library, which is used for signing and verifying JWTs.
const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		const token = authorization.split(' ')[1];
		if (token) {
			// Attempts to verify the token using jwt.verify.
			//If verification is successful, the decoded user information is stored in req.userInfo.
			try {
				const userInfo = await jwt.verify(token, 'deepansh');
				req.userInfo = userInfo;
				next();
			} catch (error) {
				return res.status(401).json({ message: 'unauthorized' });
			}
		} else {
			return res.status(401).json({ message: 'unauthorized' });
		}
	} else {
		return res.status(401).json({ message: 'unauthorized' });
	}
};

module.exports = auth;
