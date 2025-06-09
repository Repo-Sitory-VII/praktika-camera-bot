const { Sequelize } = require('sequelize');

const WorkDataDB = new Sequelize({
	dialect: 'sqlite',
	storage: './databases/WorkData.sqlite'
});

const UserDataDB = new Sequelize({
	dialect: 'sqlite',
	storage: './databases/UserData.sqlite'
});

module.exports = { WorkDataDB, UserDataDB };