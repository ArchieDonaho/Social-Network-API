const { User } = require('../Models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  getUserById({ params }, res) {},
  createUser({ body }, res) {},
  addFriend({ params }, res) {},
  updateUser({ params, body }, res) {},
  deleteUser({ params }, res) {},
  deleteFriend({ params }, res) {},
};
// BONUS: Remove a user's associated thoughts when deleted.
module.exports = userController;
