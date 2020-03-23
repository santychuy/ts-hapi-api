import { Server } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { IUser } from '../models/User';
import {
	createUser,
	getUsers,
	getUser,
	deleteUser,
} from '../controllers/user.controller';

export const routes = (server: Server) => {
	server.route({
		method: 'POST',
		path: '/users',
		handler: createUser,
		options: {
			validate: {
				payload: Joi.object<IUser>({
					username: Joi.string()
						.min(5)
						.max(20)
						.required()
						.alphanum(),
					fullname: Joi.string().required(),
					password: Joi.string()
						.min(7)
						.required(),
				}),
			},
		},
	});

	server.route({
		method: 'GET',
		path: '/users',
		handler: getUsers,
	});

	server.route({
		method: 'GET',
		path: '/users/{id}',
		handler: getUser,
	});

	server.route({
		method: 'DELETE',
		path: '/users/{id}',
		handler: deleteUser,
	});
};
