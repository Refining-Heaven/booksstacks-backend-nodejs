import userService from '../services/userService';

const handleUserSignUp = async (req, res) => {
  const message = await userService.userSignUpService(req.body)
  return res.status(200).json(message)
}

const handleUserLogin = async (req, res) => {
  const message = await userService.userLoginService(req.body)
  return res.status(200).json(message)
}

module.exports = {
  handleUserLogin,
  handleUserSignUp
}