import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import User from '../models/User';

export const createUser = async (
	{ payload }: Request,
	{ response }: ResponseToolkit
): Promise<ResponseObject> => {
	try {
		const user = new User(payload);
		const userSaved = await user.save();
		return response(userSaved);
	} catch (e) {
		return response(e).code(500);
	}
};

export const getUsers = async (
	_request: Request,
	{ response }: ResponseToolkit
): Promise<ResponseObject> => {
	try {
		const users = await User.find();
		return response(users);
	} catch (e) {
		return response(e).code(500);
	}
};

export const getUser = async (
	{ params: { id } }: Request,
	{ response }: ResponseToolkit
): Promise<ResponseObject> => {
	try {
		const user = await User.findById(id);
		if (user) {
			return response(user);
		}
		return response().code(404);
	} catch (e) {
		return response(e).code(500);
	}
};

export const deleteUser = async (
	{ params: { id } }: Request,
	{ response }: ResponseToolkit
): Promise<ResponseObject> => {
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		if (deleteUser) {
			return response(deleteUser);
		}
		return response().code(404);
	} catch (e) {
		return response(e).code(500);
	}
};
