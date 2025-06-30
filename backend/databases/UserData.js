// импортировать элементы из модуля sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// объект sequelize для обеспечения связи
const UserDataDB = new Sequelize({
	dialect: 'sqlite',
	storage: './backend/databases/UserData.sqlite'
});
UserDataDB.sync({ force: true, alter: false }).then(() => console.log('UserDataDB synched'));

// декларация класса определяет таблицу в БД
class User extends Model {}
User.init(
	// поля таблицы
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
		registrationDate: {
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

class Achievement extends Model {}
Achievement.init(
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

class UserAchievement extends Model {}
UserAchievement.init(
	{
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		sequelize: UserDataDB,
		timestamps: false,
	}
);

User.belongsToMany(Achievement, { through: UserAchievement });
Achievement.belongsToMany(User, { through: UserAchievement });

module.exports = {
	UserDataDB,
	User,
	Achievement,
	UserAchievement
}