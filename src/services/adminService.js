import db from '../models';

const addNewBookService = async (data) => {
	try {
		if (!data.bookName || !data.uploaderId) {
			return {
				errCode: 1,
				errMessage: 'Missing input Parameters!',
			};
		} else {
			const response = await db.Book.create({
				bookName: data.bookName,
				uploaderId: data.uploaderId,
			});
			return {
				errCode: 0,
				errMessage: 'Add new book succeed!',
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

const updateBookInfoService = async (data) => {
	try {
		if (!data.bookId || !data.uploaderId) {
			return {
				errCode: 1,
				errMessage: 'Missing input Parameters!',
			};
		} else {
			let book = await db.Book.findOne({
				where: { id: data.bookId },
				raw: false,
			});
			if (book) {
				book.set({
					bookName: data.bookName,
					anotherName: data.anotherName,
					author: data.author,
					status: data.status,
					kind: data.kind,
					version: data.version,
					language: data.language,
					intro: data.intro,
				});
				if (data.coverImage) {
					book.set({
						coverImage: data.coverImage,
					});
				}
				await book.save();
				const genres = data.arrGenre;
				const existing = await db.Book_Genre.findAll({
					where: { bookId: data.bookId },
					attributes: ['bookId', 'genreId'],
					raw: false,
				});
				if (!existing) {
					await db.Book_Genre.bulkCreate(genres);
				} else {
					await db.Book_Genre.destroy({ where: { bookId: data.bookId } });
					await db.Book_Genre.bulkCreate(genres);
				}
				return {
					errCode: 0,
					errMessage: 'Update book info succeed!',
				};
			} else {
				return {
					errCode: 1,
					errMessage: 'Book not found',
				};
			}
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const deleteBookService = async (bookId) => {
	try {
		if (bookId) {
			const book = await db.Book.findOne({
				where: { id: bookId },
				raw: false,
			});
			if (!book) {
				return {
					errCode: 1,
					errMessage: `The book isn't exist`,
				};
			} else {
				await book.destroy();
				return {
					errCode: 0,
					errMessage: 'Book delete succeed!',
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

const addNewChapterService = async (data) => {
	try {
		if (!data.bookId) {
			return {
				errCode: 2,
				errMessage: 'No book is selected!',
			};
		} else {
			if (!data.chapterNumber || !data.chapterContent) {
				return {
					errCode: 1,
					errMessage: 'Missing input Parameters!',
				};
			} else {
				const response = await db.Chapter.create({
					chapterNumber: data.chapterNumber,
					chapterTitle: data.chapterTitle,
					chapterContent: data.chapterContent,
					bookId: data.bookId,
				});
				return {
					errCode: 0,
					errMessage: 'Add new chapter succeed!',
				};
			}
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const updateChapterInfoService = async (data) => {
	try {
		if (!data.chapterId) {
			return {
				errCode: 1,
				errMessage: 'Missing input Parameters!',
			};
		} else {
			let chapter = await db.Chapter.findOne({
				where: { id: data.chapterId },
				raw: false,
			});
			if (chapter) {
				chapter.set({
					chapterNumber: data.chapterNumber,
					chapterTitle: data.chapterTitle,
					chapterContent: data.chapterContent,
				});
				await chapter.save();
				return {
					errCode: 0,
					errMessage: 'Update chapter info succeed!',
				};
			} else {
				return {
					errCode: 1,
					errMessage: 'Chapter not found',
				};
			}
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error from server',
		};
	}
};

const deleteChapterService = async (chapterId) => {
	try {
		if (chapterId) {
			const chapter = await db.Chapter.findOne({
				where: { id: chapterId },
				raw: false,
			});
			if (!chapter) {
				return {
					errCode: 1,
					errMessage: `The chapter isn't exist`,
				};
			} else {
				await chapter.destroy();
				return {
					errCode: 0,
					errMessage: 'Chapter delete succeed!',
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

module.exports = {
	addNewBookService,
	updateBookInfoService,
	deleteBookService,
	addNewChapterService,
	updateChapterInfoService,
	deleteChapterService
};
