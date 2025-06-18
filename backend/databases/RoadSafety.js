const { Sequelize } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const { User } = require('./UserData');

const RoadSafetyDB = new Sequelize({
	dialect: 'sqlite',
	storage: './databases/WorkData.sqlite'
});

class Camera extends Model {}
Camera.init(
	{
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
		xCoord: {
			type: DataTypes.REAL,
			allowNull: false
		},
		yCoord: {
			type: DataTypes.REAL,
			allowNull: false
		},
		azimuth: {
			type: DataTypes.REAL,
			allowNull: false
		},
		address: {
			type: DataTypes.TEXT('tiny'),
			allowNull: false
		},
		checkCount: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		sequelize: RoadSafetyDB,
		timestamps: false
	}
);

class Scenario extends Model {}
Scenario.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},
	{
		sequelize: RoadSafetyDB,
		timestamps: false
	}
);

class Task extends Model {}
Task.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		quota: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		objectsDone: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		priority: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		deadline: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
	},
	{
		sequelize: RoadSafetyDB,
		timestamps: false
	}
);

class HistoryLog extends Model {}
HistoryLog.init(
	{
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		value: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		sequelize: RoadSafetyDB,
		modelName: 'HistoryLog',
		timestamps: false
	}
);
HistoryLog.removeAttribute('id');

class ActivityLog extends Model {}
ActivityLog.init(
	{
		startTime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finishTime: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		sequelize: RoadSafetyDB,
		modelName: 'ActivityLog',
		timestamps: false
	}
);
ActivityLog.removeAttribute('id');

Scenario.hasOne(Task);
Task.belongsTo(Scenario);

User.hasMany(HistoryLog);
HistoryLog.belongsTo(User);
Task.hasMany(HistoryLog);
HistoryLog.belongsTo(Task);
Camera.hasMany(HistoryLog);
HistoryLog.belongsTo(Camera);

User.hasMany(ActivityLog);
ActivityLog.belongsTo(User);
Task.hasMany(ActivityLog);
ActivityLog.belongsTo(Task);

module.exports = {
	RoadSafetyDB,
	Camera,
	Scenario,
	Task,
	HistoryLog,
	ActivityLog
};