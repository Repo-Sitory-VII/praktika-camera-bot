const express = require('express');
const bodyParser = require('body-parser');
const endpointsUserData = require('./api/UserData')

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 5000
app.listen(port, () => {
	console.log('Server started on port ' + port)
});

function registerEndpoints(endpoints) {
	for ([endpoint, methods] of Object.entries(endpoints)) {
		endpoint = '/api' + endpoint;
		for ([method, func] of Object.entries(methods)) {
			switch(method) {
				case 'GET':
					app.get(endpoint, func);
					break;
				case 'POST':
					app.post(endpoint, func);
					break;
				case 'PUT':
					app.put(endpoint, func);
					break;
				case 'PATCH':
					app.patch(endpoint, func);
					break;
				case 'DELETE':
					app.delete(endpoint, func);
					break;
			}
		}
	}
}

registerEndpoints(endpointsUserData);
console.log('Endpoints registered');