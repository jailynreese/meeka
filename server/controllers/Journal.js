const models = require('../models');

const { Journal } = models;

const makeEntry = (req, res) => {
  console.dir(req.body.entryMain, req.body.entryMood)
  if (!req.body.entryMain || !req.body.entryMood) {
    return res.status(400).json({ error: 'All features are required to be filled out.' });
  }

  const entryData = {
    owner: req.session.account._id,
    date: req.body.entryDate,
    entry: req.body.entryMain,
    mood: req.body.entryMood,
  };

  const newEntry = new Journal.JournalModel(entryData);

  const journalPromise = newEntry.save();

  journalPromise.then(() => res.json({ redirect: '/maker' }));

  journalPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You\'ve already created an entry for that day. ' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return journalPromise;
};

// const addFile = (req, res) => {

// };

const makerPage = (req, res) => {
  Journal.JournalModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), entries: docs });
  });
};

const getEntries = (req, res) => Journal.JournalModel.findByOwner(req.session.account._id,
  (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ entries: docs });
  });

module.exports.getEntries = getEntries;
module.exports.makeEntry = makeEntry;
module.exports.makerPage = makerPage;
// module.exports.addFile = addFile;
