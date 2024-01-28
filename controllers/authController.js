const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authController {
	//extract userinfo from request body -> check if email exists -> create new user with hashed password -> create a jwt token with secret deepansh -> return token
	user_register = async (req, res) => {
		let { name, email, password } = req.body;
		//Trims leading and trailing whitespace
		email = email.trim();
		password = password.trim();
		name = name.trim();
		try {
			const get_user = await userModel
				.findOne({ email })
				.select('+password');

			if (get_user) {
				return res
					.status(404)
					.json({ message: 'Email already exists' });
			} else {
				const user = await userModel.create({
					name,
					email,
					//The password is hashed using bcrypt before being stored in the database.
					password: await bcrypt.hash(password, 9),
				});
				//Creates a JWT (JSON Web Token) containing user information. The token is signed with the secret 'deepansh'
				const token = await jwt.sign(
					{
						name: user.name,
						email: user.email,
						_id: user.id,
					},
					'deepansh',
					{
						expiresIn: '2d',
					}
				);

				return res
					.status(201)
					.json({ message: 'Signup successfull!', token });
			}
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	//extract userinfo from request body -> check if email exists -> compare passwords -> if match -> create a jwt token and return it.
	user_login = async (req, res) => {
		let { email, password } = req.body;
		try {
			const user = await userModel.findOne({ email }).select('+password');

			if (user) {
				//Compares the provided password with the hashed password stored in the database using bcrypt's compare function.
				const match = await bcrypt.compare(password, user.password);

				if (match) {
					const token = await jwt.sign(
						{
							name: user.name,
							email: user.email,
							_id: user.id,
						},
						'deepansh',
						{
							expiresIn: '2d',
						}
					);

					return res
						.status(200)
						.json({ message: 'Signin successfull!', token });
				} else {
					return res
						.status(404)
						.json({ message: 'Password invalid' });
				}
			} else {
				return res.status(404).json({ message: "Email doesn't exist" });
			}
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ message: 'Internal server error' });
		}
	};
}

module.exports = new authController();
