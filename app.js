const express = require('express');
const bodyParser = require('body-parser');
const { UserDataDB, User, Achievment } = require('./databases/UserData');
const { WorkDataDB, Camera, Scenario, Task, HistoryLog, ActivityLog } = require('./databases/RoadSafety')
const endpointsUserData = require('./api/endpoints/UserData')

WorkDataDB.sync({ force: true }).then(() => console.log('WorkDataDB synched'));
UserDataDB.sync({ force: true }).then(() => console.log('UserDataDB synched'));

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('Server started on port ' + port)
});

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