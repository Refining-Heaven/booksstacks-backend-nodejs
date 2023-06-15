import appService from '../services/appService';

//
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

// Book
const handleGetAllBook = async (req, res) => {
	const message = await appService.getAllBookService();
	return res.status(200).json(message);
};

const handleGetAllNewBook = async (req, res) => {
	const message = await appService.getAllNewBookService();
	return res.status(200).json(message);
};

const handleGetAllBookByName = async (req, res) => {
	const name = req.query.name;
	const message = await appService.getAllBookByNameService(name);
	return res.status(200).json(message);
};

const handleGetAllBookByGenre = async (req, res) => {
	const genreId = req.query.id;
	const message = await appService.getAllBookByGenreService(genreId);
	return res.status(200).json(message);
};

const handleGetBookInfo = async (req, res) => {
	const bookId = req.query.id;
	const message = await appService.getBookInfoService(bookId);
	return res.status(200).json(message);
};

// Chapter
const handleGetAllChapter = async (req, res) => {
	const bookId = req.query.id;
	const message = await appService.getAllChapterService(bookId);
	return res.status(200).json(message);
};

const handleGetChapterInfo = async (req, res) => {
	const chapterId = req.query.id;
	const message = await appService.getChapterInfoService(chapterId);
	return res.status(200).json(message);
};

module.exports = {
	handleGetAllGenre,
	handleGetAllKind,
	handleGetAllCode,
	handleGetAllBook,
	handleGetAllNewBook,
	handleGetAllBookByName,
	handleGetAllBookByGenre,
	handleGetBookInfo,
	handleGetAllChapter,
	handleGetChapterInfo,
};
