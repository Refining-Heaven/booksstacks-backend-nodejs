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

const handleAddComment = async (req, res) => {
	const message = await userService.addCommentService(req.body);
	return res.status(200).json(message);
};

const handleAddReply = async (req, res) => {
	const message = await userService.addReplyService(req.body);
	return res.status(200).json(message);
};

const handleDeleteComment = async (req, res) => {
  const id = req.query.id;
	const type = req.query.type;
	const message = await userService.deleteCommentService(id, type);
	return res.status(200).json(message);
};

module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleGetAccountInfo,
  handleUpdateAccountInfo,
  handleChangePassword,
  handleAddComment,
  handleAddReply,
  handleDeleteComment
}