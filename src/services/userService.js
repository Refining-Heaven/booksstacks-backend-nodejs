import db from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
	try {
		const hashPassword = await bcrypt.hashSync(password, salt);
		return hashPassword;
	} catch (e) {
		console.log(e);
	}
};

const checkUserEmail = async (userEmail) => {
	try {
		const user = await db.User.findOne({
			where: { email: userEmail },
		});
		if (user) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
	}
};

const signUpUserService = async (data) => {
	try {
		const check = await checkUserEmail(data.email);
		if (check === true) {
			return {
				errCode: 1,
				errMessage: 'Your email is already used',
			};
		} else {
			const hashPasswordFromBycrypt = await hashUserPassword(data.password);
			await db.User.create({
        email: data.email,
				username: data.username,
				password: hashPasswordFromBycrypt,
			});
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

const userLoginService = async (email, password) => {
  try {
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        errMessage: 'Missing inputs parameter',
      });
    } else {
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          where: { email: email },
          attributes: ['email', 'username' , 'password'],
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compareSync(password, user.password);
          if (check) {
            delete user.password;
            return {
              errCode: 0,
              errMessage: 'Ok',
              data: user
            }
          } else {
            return {
              errCode: 4,
              errMessage: 'Wrong password'
            }
          }
        } else {
          return {
            errCode: 3,
            errMessage: 'User not found'
          }
        }
      } else {
        return {
          errCode: 2,
          errMessage: `Your Email isn't exist in our system`
        }
      }
    }
	} catch (e) {
		console.log(e);
    return {
      errCode: -1,
      errMessage: 'Error from server'
    }
	}
}

module.exports = {
  signUpUserService,
  userLoginService
}