import userService from '../services/userService';

const handleUserSignUp = async (req, res) => {
  const message = await userService.userSignUpService(req.body)
  return res.status(200).json(message)
}

const handleUserLogin = async (req, res) => {
  const message = await userService.userLoginService(req.body)
  return res.status(200).json(message)
}

const handleGetAccountInfo = async (req, res) => {
	const userId = req.query.id;
	const message = await userService.getAccountInfoService(userId);
	return res.status(200).json(message);
};

const handleUpdateAccountInfo = async (req, res) => {
  const message = await userService.updateAccountInfoService(req.body)
  return res.status(200).json(message)
}

const handleChangePassword = async (req, res) => {
  const message = await userService.changePasswordService(req.body)
  return res.status(200).json(message)
}

module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleGetAccountInfo,
  handleUpdateAccountInfo,
  handleChangePassword
}