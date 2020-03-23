import { Server } from '@hapi/hapi';
import { routes } from './routes/user.routes';

export const init = async () => {
	const server: Server = new Server({
		port: 3000,
		host: 'localhost',
	});

	routes(server);

	server.route({
		method: '*',
		path: '/{any*}',
		handler: function(_request, _h) {
			return '404 Error! Page Not Found!';
		},
	});

	await server.start();
	console.log(`Server running on: ${server.info.uri}`);
};
