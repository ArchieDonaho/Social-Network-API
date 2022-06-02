const { User } = require('../Models');

const userController = {
  // return a list of all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // return a single user by it's id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user to add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // update a user by their id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // delete a user by their id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // delete a friend using the user's id and the friend's id
  deleteFriend({ params }, res) {
    console.log(params.userId, params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
// BONUS: Remove a user's associated thoughts when deleted.
module.exports = userController;
