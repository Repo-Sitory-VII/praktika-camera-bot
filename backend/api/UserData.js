// импорт моделей БД
const { User, Achievement, UserAchievement } = require('../databases/UserData');

// обьект содержащий маршруты API и функции для выполнения http методов
const endpoints = {
	'/users': {
		GET: async (req, res) => {
			res.status(200).send(await User.findAll({
				...(req.query['include-achievements'] === 'true') && { include: Achievement }
			}));
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
			const entry = await User.findByPk(req.params.userId, {
				...(req.query['include-achievements'] === 'true') && { include: Achievement }
			});
			res.status(entry ? 200 : 404).send(entry);
		},
		PATCH: async (req, res) => {
			try {
				res.status((await User.update(req.body, { where: { id: req.params.achievementId } }))[0] == 0 ? 404 : 200).send();
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
			const entry = await User.findByPk(req.params.userId)
			if (entry)
				res.status(200).send(entry.getAchievements());
			else
				res.status(400).send();
		}
	},
	'/users/:userId/achievements/:achievementId': {
		GET: async (req, res) => {
			const entry = await UserAchievement.findOne({ where: { UserId: req.params.userId, AchievmentId: req.params.achievementId } });
			res.status(entry ? 200 : 404).send();
		},
		POST: async (req, res) => {
			console.log('grant ach')
			try {
			// res.status(200).send(await UserAchievment.create({ UserId: req.params.userId, AchievmentId: req.params.achievementId }));
			}
			catch (error) {
				res.status(400).send(error);
			}
		},
		DELETE: async (req, res) => {
			try {
				res.status(200).send(await UserAchievement.destroy({ where: { UserId: req.params.userId, AchievmentId: req.params.achievementId } }));
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
			res.status(entry ? 200 : 404).send(entry);
		},
		PATCH: async (req, res) => {
			try {
				res.status((await Achievement.update(req.body, { where: { id: req.params.achievementId } }))[0] == 0 ? 404 : 200).send();
			}
			catch (error) {
				res.status(400).send(error);
			}
		},
		DELETE: async (req, res) => {
			res.status(await Achievement.destroy({ where: { id: req.params.achievementId }}) == 0 ? 404 : 200).send();
		}
	},
	'/achievements/:achievementId/users':
	{
		GET: async (req, res) => {
			res.status(200).send(await UserAchievement.findAll({ where: { aAhievementId: req.params.achievementId } }));
		}
	}
}

module.exports = endpoints;