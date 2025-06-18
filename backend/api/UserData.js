const { response } = require('express');
const { User, Achievment: Achievement, UserAchievment } = require('../databases/UserData');
const { DELETE } = require('sequelize/lib/query-types');

const endpoints = {
	'/users': {
		GET: async (req, res) => {
			res.status(200).send(await User.findAll());
		},
		POST: async (req, res) => {
			try {
				res.status(201).send(await User.create(req.body))
			}
			catch (error) {
				res.status(400).send(error);
			}
		}
	},
	'/users/:userId': {
		GET: async (req, res) => {
			const entry = await User.findByPk(req.params.userId);
			res.status(entry ? 404 : 200).send(entry);
		},
		PATCH: async (req, res) => {
			try {
				res.status(200).send(await User.update(req.body, { where: { id: req.params.userId } }));
			}
			catch (error) {
				res.status(400).send(error);
			}
		},
		DELETE: async (req, res) => {
			res.status(await User.destroy({ where: { id: req.params.userId }}) == 0 ? 404 : 200).send({});
		}
	},
	'/users/:userId/achievements': {
		GET: async (req, res) => {
			res.status(200).send(await UserAchievment.findAll({ where: { UserId: req.params.userId } }));
		}
	},
	'/users/:userId/achievements/:achievementId': {
		GET: async (req, res) => {
			res.status(200).send(await UserAchievment.findOne({ where: { UserId: req.params.userId, AchievmentId: req.params.achievementId } }));
		},
		POST: async (req, res) => {
			try {
			res.status(200).send(await UserAchievment.create({ UserId: req.params.userId, AchievmentId: req.params.achievementId }));
			}
			catch (error) {
				res.status(400).send(error);
			}
		},
		DELETE: async (req, res) => {
			try {
				res.status(200).send(await UserAchievment.destroy({ where: { UserId: req.params.userId, AchievmentId: req.params.achievementId } }));
			}
			catch (error) {
				res.status(400).send(error);
			}
		}
	},
	'/achievements':
	{
		GET: async (req, res) => {
			res.status(200).send(await Achievement.findAll());
		},
		POST: async (req, res) => {
			try {
				body = await Achievement.create(req.body);
				res.status(201).send(body)
			}
			catch (error) {
				res.status(400).send(error);
			}
		}
	},
	'/achievements/:achievementId':
	{
		GET: async (req, res) => {
			const entry = await Achievement.findByPk(req.params.achievementId);
			res.status(entry ? 404 : 200).send(entry);
		},
		PATCH: async (req, res) => {
			try {
				res.status(200).send(await Achievement.update(req.body, { where: { id: req.params.achievementId } }));
			}
			catch (error) {
				res.status(400).send(error);
			}
		},
		DELETE: async (req, res) => {
			res.status(await Achievement.destroy({ where: { id: req.params.achievementId }}) == 0 ? 404 : 200).send({});
		}
	}
}

module.exports = endpoints;