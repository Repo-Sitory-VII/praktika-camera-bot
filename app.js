const express = require('express');
const bodyParser = require('body-parser');
const { WorkDataDB, UserDataDB } = require('./databases/databases');
const User = require('./databases/models/User')

WorkDataDB.sync({ force: true }).then(() => console.log('WorkDataDB synched'));
UserDataDB.sync({ force: true }).then(() => User.create({id: 0, nickname: 'aaa' }));

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
	console.log("Server started")
});