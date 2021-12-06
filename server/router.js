const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getEntries', mid.requiresLogin, controllers.Journal.getEntries);
  app.get('/login', mid.requiresSecure, mid.requireLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requireLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requireLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Journal.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Journal.makeEntry);
  app.post('/updatePass', mid.requiresLogin, controllers.Account.updatePass);
  app.get('/', mid.requiresSecure, mid.requireLogout, controllers.Account.loginPage);
  //app.post('/uploadFile', mid.requiresLogin, controllers.File.uploadFile);
  //app.get('/retrieveFile', mid.requiresLogin, controllers.File.retrieveFile);
};

module.exports = router;
