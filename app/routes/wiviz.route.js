import wiviz from '../controllers/wiviz.controller';

module.exports = (app) => {
    app.get('/wiviz/', wiviz.read);
    app.get('/wiviz/mac/:mac',wiviz.macPage)
};