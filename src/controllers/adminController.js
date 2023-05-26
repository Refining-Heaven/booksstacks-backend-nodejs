import adminService from '../services/adminService';

const handleAddNewBook = async (req, res) => {
  const message = await adminService.addNewBookService(req.body)
  return res.status(200).json(message)
}

module.exports = {
  handleAddNewBook,
}