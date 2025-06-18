const express = require('express');
const bodyParser = require('body-parser');
const { UserDataDB, User, Achievment } = require('./databases/UserData');
const { RoadSafetyDB, Camera, Scenario, Task, HistoryLog, ActivityLog } = require('./databases/RoadSafety')
const endpointsUserData = require('./api/endpoints/UserData')

const force = false
RoadSafetyDB.sync({ force: force }).then(() => console.log('WorkDataDB synched'));
UserDataDB.sync({ force: force }).then(() => console.log('UserDataDB synched'));

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 5000
app.listen(port, () => {
	console.log('Server started on port ' + port)
});

function returnErrror(func) {
	return function(...args) {
		try {
			return func(...args);
		}
		catch (error) {
			args.res.status(400).send(error);
		}
	}
}

function registerEndpoints(endpoints) {
	for ([endpoint, methods] of Object.entries(endpoints)) {
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