import appService from '../services/appService';

const handleGetAllGenre = async (req, res) => {
	const message = await appService.getAllGenreService();
	return res.status(200).json(message);
};

const handleGetAllKind = async (req, res) => {
	const message = await appService.getAllKindService();
	return res.status(200).json(message);
};

const handleGetAllCode = async (req, res) => {
	const message = await appService.getAllCodeService(req.query.type);
	return res.status(200).json(message);
};

const handleGetAllBook = async (req, res) => {
	const message = await appService.getAllBookService();
	return res.status(200).json(message);
};

const handleGetAllNewBook = async (req, res) => {
	const message = await appService.getAllNewBookService();
	return res.status(200).json(message);
};

const handleGetAllBookByGenre = async (req, res) => {
	const genreId = req.query.genreId;
	const message = await appService.getAllBookByGenreService(genreId);
	return res.status(200).json(message);
};

const handleGetBookInfoById = async (req, res) => {
	const bookId = req.query.id;
	const message = await appService.getBookInfoByIdService(bookId);
	return res.status(200).json(message);
};

module.exports = {
	handleGetAllGenre,
	handleGetAllKind,
	handleGetAllCode,
	handleGetAllBook,
	handleGetAllNewBook,
	handleGetAllBookByGenre,
	handleGetBookInfoById,
};
