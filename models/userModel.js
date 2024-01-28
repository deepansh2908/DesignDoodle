//These classes are used to define schemas and create models for MongoDB documents.
const { model, Schema } = require('mongoose');

const user_schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		image: {
			type: String,
			default: '',
		},
	},
	// { timestamps: true } enables automatic timestamp assignment for createdAt and updatedAt fields.
	{ timestamps: true }
);

//The model function is invoked with two arguments: the name of the MongoDB collection ('users') and the user schema (user_schema).
module.exports = model('users', user_schema);
