const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  createReaction,
  updateThought,
  deleteThought,
  deleteReaction,
} = require('../../controllers/thought-controller');

// GET & POST /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// GET & PUT & DELETE /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// PUT /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions/').put(createReaction);

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
