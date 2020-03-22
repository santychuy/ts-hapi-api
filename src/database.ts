import { connect, ConnectionOptions } from 'mongoose';

const options: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

(async () => {
	try {
		await connect('mongodb://localhost/hapi-test', options);
		console.log('Database connected!');
	} catch (e) {
		throw e;
	}
})();
