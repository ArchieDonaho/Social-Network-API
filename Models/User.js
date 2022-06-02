const router = require('express').Router();
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({});

const User = model('User', UserSchema);

module.exports = User;
