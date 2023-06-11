import { Op } from 'sequelize';
import db from '../models';
import sequelize from 'sequelize';

const getAllGenreService = async () => {
	try {
		const response = await db.Genre.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		if (!response) {
			return {
				errCode: 1,
				errMessage: 'Cannot get genre',
			};
		} else {
			return {
				errCode: 0,
				errMessage: 'Ok',
				data: response,
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getAllKindService = async () => {
	try {
		const response = await db.Kind.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		if (!response) {
			return {
				errCode: 1,
				errMessage: 'Cannot get genre',
			};
		} else {
			return {
				errCode: 0,
				errMessage: 'Ok',
				data: response,
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getAllCodeService = async (type) => {
	try {
		if (!type) {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters!',
			};
		} else {
			const allcode = await db.Allcode.findAll({
				where: { type: type },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			});
			return {
				errCode: 0,
				data: allcode,
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

// Book
const getAllBookService = async () => {
	try {
		const allBook = await db.Book.findAll({
			order: [['bookName', 'ASC']],
			attributes: {
				exclude: ['intro', 'createdAt', 'updatedAt'],
			},
			include: [
				{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
			],
			raw: true,
			nest: true,
		});
		return {
			errCode: 0,
			data: allBook,
		};
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getAllNewBookService = async () => {
	try {
		const allBook = await db.Book.findAll({
			order: [['updatedAt', 'DESC']],
			limit: 6,
			attributes: {
				exclude: ['intro', 'createdAt'],
			},
			include: [
				{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
			],
			raw: true,
			nest: true,
		});
		return {
			errCode: 0,
			data: allBook,
		};
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getAllBookByNameService = async (name) => {
	try {
		if (name) {
			const allBook = await db.Book.findAll({
				where: {
					bookName: { [Op.like]: '%' + name + '%' },
				},
				limit: 5,
				order: [['bookName', 'ASC']],
				attributes: {
					exclude: ['author', 'intro', 'uploaderId', 'status', 'kind', 'language', 'version', 'createdAt', 'updatedAt'],
				},
			});
			return {
				errCode: 0,
				data: allBook,
			};
		} else {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getAllBookByGenreService = async (genreId) => {
	try {
		if (genreId) {
			const allBook = await db.Book_Genre.findAll({
				where: { genreId: genreId },
				order: [['updatedAt', 'DESC']],
				attributes: {
					exclude: ['id', 'createdAt'],
				},
				include: [
					{
						model: db.Book,
						as: 'bookData',
						attributes: ['bookName', 'anotherName', 'author'],
						include: [
							{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
							{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
							{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
							{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
						],
					},
				],
				raw: true,
				nest: true,
			});
			const genre = await db.Book_Genre.findOne({
				where: { genreId: genreId },
				attributes: {
					exclude: ['id', 'bookId', 'createdAt', 'updatedAt'],
				},
				include: [{ model: db.Genre, as: 'genreData', attributes: ['valueEn', 'valueVi'] }],
				raw: true,
				nest: true,
			});
			return {
				errCode: 0,
				data: { allBook, ...genre },
			};
		} else {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getBookInfoService = async (bookId) => {
	try {
		if (bookId) {
			const bookInfo = await db.Book.findOne({
				where: { id: bookId },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
				include: [
					{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.User, as: 'uploader', attributes: ['username'] },
				],
				raw: true,
				nest: true,
			});
			const genreData = await db.Book_Genre.findAll({
				where: { bookId: bookId },
				attributes: {
					exclude: ['id', 'bookId', 'createdAt', 'updatedAt'],
				},
				include: [{ model: db.Genre, as: 'genreData', attributes: ['valueEn', 'valueVi'] }],
				raw: true,
				nest: true,
			});
			if (!bookInfo) {
				return {
					errCode: 1,
					errMessage: `The book isn't exist`,
				};
			} else {
				return {
					errCode: 0,
					errMessage: 'Ok',
					data: { ...bookInfo, genreData },
				};
			}
		} else {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

// Chapter
const getAllChapterService = async (bookId) => {
	try {
		if (bookId) {
			const allChapter = await db.Chapter.findAll({
				where: { bookId: bookId },
				order: [['chapterNumber', 'ASC']],
				attributes: {
					exclude: ['chapterContent', 'createdAt', 'updatedAt'],
					include: [
						[sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d/%m/%Y'), 'date'],
						[sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%H:%i:%s'), 'time']
					],
				},
			});
			return {
				errCode: 0,
				data: allChapter,
			};
		} else {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const getChapterInfoService = async (chapterId) => {
	try {
		if (chapterId) {
			const chapterInfo = await db.Chapter.findOne({
				where: { id: chapterId },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
					include: [
						[sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d/%m/%Y'), 'date'],
						[sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%H:%i:%s'), 'time']
					],
				},
			});
			return {
				errCode: 0,
				data: chapterInfo,
			};
		} else {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

module.exports = {
	getAllGenreService,
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getAllNewBookService,
	getAllBookByNameService,
	getAllBookByGenreService,
	getBookInfoService,
	getAllChapterService,
	getChapterInfoService,
};
