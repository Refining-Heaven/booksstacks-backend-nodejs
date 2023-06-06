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

const userSignUpService = async (data) => {
	try {
    if (!data.email || !data.username || !data.password) {
      return {
        errCode: 2,
        errMessage: 'Missing input parameters!',
      };
    } else {
      const checkEmail = await checkUserEmail(data.email);
      if (checkEmail === true) {
        return {
          errCode: 1,
          errMessage: 'Your email is already in use!',
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
          errMessage: 'Sign up succeed!',
        };
      }
    }
	} catch (e) {
		console.log(e);
    return {
      errCode: -1,
      errMessage: 'Error from server!',
    };
	}
};

const userLoginService = async (data) => {
  try {
    if (!data.email || !data.password) {
      return {
        errCode: 4,
        errMessage: 'Missing inputs parameters!',
      };
    } else {
      const isExist = await checkUserEmail(data.email);
      if (isExist) {
        const user = await db.User.findOne({
          where: { email: data.email },
          attributes: ['id', 'email', 'username' , 'password', 'role', 'avatar'],
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compareSync(data.password, user.password);
          if (check) {
            delete user.password;
            return {
              errCode: 0,
              errMessage: 'Login succeed!',
              data: user
            }
          } else {
            return {
              errCode: 1,
              errMessage: 'Wrong password!'
            }
          }
        } else {
          return {
            errCode: 2,
            errMessage: 'User not found!'
          }
        }
      } else {
        return {
          errCode: 3,
          errMessage: `Your Email isn't exist in our system!`
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
  userSignUpService,
  userLoginService
}