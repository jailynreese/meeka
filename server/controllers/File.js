const filedb = require('../models/File');

const uploadFile = (req, res) => {
  if (req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  const { sampleFile } = req.files;
  console.log(sampleFile);

  const fileDoc = new filedb.FileModel(sampleFile);

  const savePromise = fileDoc.save();

  savePromise.then(() => {
    res.status(201).json({ message: 'upload successful' });
  });

  savePromise.catch((err) => {
    console.dir(err);
    res.status(500).json({ message: 'something went wrong' });
  });

  return savePromise;
};

const retrieveFile = (req, res) => {
  if (!req.query.fileName) {
    return res.status(400).json({ error: 'Missing file name' });
  }

  // return filedb.FileModel.findOne({ name: req.query.fileName }, (err, doc) => {
  //   if (err) {
  //     console.dir(err);
  //     return res.status(500).json({ error: 'An error occurred retrieving the file' });
  //   }
  //   if (!doc) {
  //     return res.status(404).json({ error: 'File not found' });
  //   }

  //   res.writeHead(200, {
  //     'Content-Type': doc.mimeType,
  //     'Content-length': doc.size,
  //   });

  //   return res.end(doc.data);
  // });

  return filedb.FileModel.findByOwner(req.session.account._id, req.session.account.date, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ pics: doc.data });
  });
};

module.exports.uploadFile = uploadFile;
module.exports.retrieveFile = retrieveFile;
