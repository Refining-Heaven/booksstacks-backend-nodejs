import express from 'express';
import userController from '../controllers/userController';
import adminController from '../controllers/adminController';
import appController from '../controllers/appController';

const router = express.Router();

const initWebRoutes = (app) => {
	router.post('/api/sign-up', userController.handleUserSignUp);
	router.post('/api/login', userController.handleUserLogin);

	router.post('/api/add-new-book', adminController.handleAddNewBook);
	router.put('/api/update-book-info', adminController.handleUpdateBookInfo);
	router.delete('/api/delete-book', adminController.handleDeleteBook);

	router.get('/api/get-all-genre', appController.handleGetAllGenre);
	router.get('/api/get-all-kind', appController.handleGetAllKind);
	router.get('/api/get-all-code', appController.handleGetAllCode);
	router.get('/api/get-all-book', appController.handleGetAllBook);
	router.get('/api/get-book-info-by-id', appController.handleGetBookInfoById);

	return app.use('/', router);
};

module.exports = initWebRoutes;
