const router = require('express').Router();
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: 'Reaction cannot be blank',
    },
    username: {
      type: String,
      required: 'Username cannot be blank',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought cannot be blank',
      minlength: 1,
      maxlength: 128,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
    username: {
      type: String,
      required: 'A valid username must be used',
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
