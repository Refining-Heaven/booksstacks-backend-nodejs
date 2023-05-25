import userService from '../services/userService';

const handleSignUpUser = async (req, res) => {
  const message = await userService.signUpUserService(req.body)
  return res.status(200).json(message)
}

const handleUserLogin = async (req, res) => {
  const email = req.body.email;
	const password = req.body.password;

  const message = await userService.userLoginService(email, password)
  return res.status(200).json(message)
}

module.exports = {
  handleUserLogin,
  handleSignUpUser
}