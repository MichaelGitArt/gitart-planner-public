const mongoose = require('mongoose');

const app = require('./server/app');

const dotEnv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
	dotEnv.config({ path: './.env.local' });
}

const port =
	process.env.NODE_ENV === 'production' ? process.env.PORT || 3000 : 3001;

mongoose
	.connect(process.env.MONGODB_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log('Server launched');
		});
	})
	.catch((err) => console.log(err));
