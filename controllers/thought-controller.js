const { Thought } = require('../Models');

const thoughtController = {
  // find all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // get a single thought by it's id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // create a reaction to a thought by it's id
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // update a thought by it's id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // delete a thought by it's id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // delete a reaction by it's id
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought/reaction with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
