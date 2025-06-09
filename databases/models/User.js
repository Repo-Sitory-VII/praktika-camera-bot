const { Model, DataTypes } = require('sequelize');
const { WorkDataDB, UserDataDB } = require('../databases');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		role: {
			type: DataTypes.STRING,
			unique: true
		},
		registration_date: {
			type: DataTypes.DATEONLY,
			defaultValue: DataTypes.NOW
		},
		objects_done: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			defaultValue: 0
		},
		score: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		sequelize: UserDataDB,
		timestamps: false
	}
);

module.exports = User;