const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// const _ = require('underscore');

let JournalModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertID = mongoose.Types.ObjectId;

const JounralSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // dayRating: {
  //   type: Number,
  //   min: 1,
  //   required: true,
  // },
  mood: {
    type: String,
    required: true,
    trim: true,
  },
  entry: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

JounralSchema.statics.toAPI = (doc) => ({
  date: doc.date,
  //dayRating: doc.dayRating,
  mood: doc.mood,
  entry: doc.entry,
});

JounralSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };
  return JournalModel.find(search).select('date mood entry').lean().exec(callback);
};

JournalModel = mongoose.model('Journal', JounralSchema);

module.exports.JournalModel = JournalModel;
module.exports.JounralSchema = JounralSchema;
