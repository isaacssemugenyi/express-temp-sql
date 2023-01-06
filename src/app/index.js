module.exports = (app) => {
  require('./students/studentRoute')(app);
  require('./courses/courseRoute')(app);
};
