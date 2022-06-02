const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  addFriend,
  updateUser,
  deleteUser,
  deleteFriend,
} = require('../../controllers/user-controller');

// GET & POST api/users
router.route('/').get(getAllUsers).post(createUser);

// GET & PUT & DELETE /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// PUT & DELETE /api/users/:userId/friends/:friendId
router.route('/:id/friends/:id').put(addFriend).delete(deleteFriend);

module.exports = router;
