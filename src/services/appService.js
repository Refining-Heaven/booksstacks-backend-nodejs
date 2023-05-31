import db from '../models';

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

const getAllBookService = async () => {
	try {
		const allBook = await db.Book.findAll({
			include: [
				{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
			],
			raw: true,
			nest: true
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

const getBookInfoByIdService = async (bookId) => {
	try {
		if (bookId) {
			const bookInfo = await db.Book.findOne({
				where: { id: bookId },
				attributes: {
					exclude: []
				},
				include: [
					{ model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'versionData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'languageData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Kind, as: 'kindData', attributes: ['valueEn', 'valueVi'] },
				],
				raw: true,
				nest: true
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
					data: bookInfo,
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
	getAllGenreService,
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getBookInfoByIdService,
};
