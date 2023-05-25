import express from 'express';
import userController from '../controllers/userController';
import appController from '../controllers/appController';

const router = express.Router();

const initWebRoutes = (app) => {
  router.post('/api/sign-up', userController.handleSignUpUser);
	router.post('/api/login', userController.handleUserLogin);

	router.get('/api/get-all-genre', appController.handleGetAllGenre)
	router.get('/api/get-all-kind', appController.handleGetAllKind)
	router.get('/api/get-all-code', appController.handleGetAllCode)

	return app.use('/', router);
};

module.exports = initWebRoutes;
