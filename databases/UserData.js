const { Sequelize } = require('sequelize');
const { Model, DataTypes } = require('sequelize');

const UserDataDB = new Sequelize({
	dialect: 'sqlite',
	storage: './databases/UserData.sqlite'
});

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
		objectsDone: {
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

class Achievment extends Model {}
Achievment.init(
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
		sequelize: UserDataDB,
		timestamps: false
	}
);

class UserAchievment extends Model {}
UserAchievment.init(
	{
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		sequelize: UserDataDB,
		timestamps: false
	}
);

User.belongsToMany(Achievment, { through: UserAchievment });
Achievment.belongsToMany(User, { through: UserAchievment });

module.exports = {
	UserDataDB,
	User,
	Achievment
}