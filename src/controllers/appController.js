import appService from '../services/appService';

//
const handleGetAllGenre = async (req, res) => {
	const message = await appService.getAllGenreService();
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
	const limit = req.query.limit
	const message = await appService.getAllNewBookService(limit);
	return res.status(200).json(message);
};

const handleGetAllBookByName = async (req, res) => {
	const name = req.query.name;
	const message = await appService.getAllBookByNameService(name);
	return res.status(200).json(message);
};

const handleGetAllBookByGenre = async (req, res) => {
	const genreId = req.query.id;
	const limit = req.query.limit;
	const message = await appService.getAllBookByGenreService(genreId, limit);
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

// Account
const handleGetAllAccount = async (req, res) => {
	const message = await appService.getAllAccountService();
	return res.status(200).json(message);
};

// Comment
const handleGetAllComment = async (req, res) => {
	const id = req.query.id;
	const type = req.query.type;
	const message = await appService.getAllCommentService(id, type);
	return res.status(200).json(message);
};

// Reply
const handleGetAllReply = async (req, res) => {
	const commentId = req.query.id;
	const message = await appService.getAllReplyService(commentId);
	return res.status(200).json(message);
};

module.exports = {
	handleGetAllGenre,
	handleGetAllCode,
	handleGetAllBook,
	handleGetAllNewBook,
	handleGetAllBookByName,
	handleGetAllBookByGenre,
	handleGetBookInfo,
	handleGetAllChapter,
	handleGetChapterInfo,
	handleGetAllAccount,
	handleGetAllComment,
	handleGetAllReply
};
