import db from '../models';

const addNewBookService = async (data) => {
	try {
    if (!data.name || !data.author || !data.status || ! data.kind ||
      !data.version || !data.language || !data.intro) {
        return {
          errCode: 1,
          errMessage: 'Missing input Params',
        };
      } else {
        const response = await db.Book.create({
          name: data.name,
          author: data.author,
          intro: data.intro,
          uploaderId: data.uploaderId,
          status: data.status,
          kind: data.kind,
          version: data.version,
          language: data.language,
          coverImage: data.coverImage
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