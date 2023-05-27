import db from '../models';

const addNewBookService = async (data) => {
	try {
    if (!data.bookName || !data.uploaderId) {
        return {
          errCode: 1,
          errMessage: 'Missing input Params',
        };
      } else {
        const response = await db.Book.create({
          bookName: data.bookName,
          uploaderId: data.uploaderId,
        })
        return {
          errCode: 0,
          errMessage: 'OK',
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
};