const { response } = require('express');
const { User, Achievment } = require('../../databases/UserData');

function setEndpoints(app) {
	app.get('/users', async (req, res) => {
		let temp = await User.findAll();
		console.log(temp);
		res.status(200).send(temp);
	})
}

const endpoints = {
	'/users': {
		GET: async (req, res) => {
			res.status(200).send(await User.findAll());
		},
		POST: async (req, res) => {
			try {
				body = await User.create(req.body);
				res.status(201).send(body)
			}
			catch (error) {
				res.status(400).send({
					error: error,
					body: req.body
				})
			}
		},
		
	}
}

module.exports = endpoints;