import adminService from '../services/adminService';

const handleAddNewBook = async (req, res) => {
  const message = await adminService.addNewBookService(req.body)
  return res.status(200).json(message)
}

const handleUpdateBookInfo = async (req, res) => {
  const message = await adminService.updateBookInfoService(req.body)
  return res.status(200).json(message)
}

const handleDeleteBook = async (req, res) => {
  const bookId = req.body.id
  const message = await adminService.deleteBookService(bookId)
  return res.status(200).json(message)
}

module.exports = {
  handleAddNewBook,
  handleUpdateBookInfo,
  handleDeleteBook
}