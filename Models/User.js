const router = require('express').Router();
const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required',
      trim: true,
      match: [/.+\@.+\..+/, 'please fill an valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// delete all thoughts if the user is deleted
UserSchema.pre('remove', function (next) {
  console.log(this);
  Thought.findOneAndDelete({ username: this.username }).exec();
  next();
});

// add up all friends
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
