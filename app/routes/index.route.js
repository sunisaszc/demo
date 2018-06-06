import index from '../controllers/index.controller';

module.exports = (app) => {
    app.get('/', index.index);
    app.get('/mac/:mac', index.macPage);
    app.get('/websocket',index.webSocket)
};