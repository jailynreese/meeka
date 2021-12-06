const mongoose = require('mongoose');

let FileModel = {};
const FileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  data: {
    type: Buffer,
  },
  size: {
    type: Number,
  },
  encoding: {
    type: String,
  },
  tempFilePath: {
    type: String,
  },
  trunicated: {
    type: Boolean,
  },
  mimetpye: {
    type: String,
  },
  md5: {
    type: String,
  },
});

// FileSchema.statics.findByOwner = (ownerId, entryDate, callback) => {
//   const search = {
//     //owner: convertID(ownerId),
//     date: entryDate,
//   };
//   //return JournalModel.find(search).select('data').lean().exec(callback);
// };

FileModel = mongoose.model('FileModel', FileSchema);

module.exports.FileModel = FileModel;
module.exports.FileSchema = FileSchema;
