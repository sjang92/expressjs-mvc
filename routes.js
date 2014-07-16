var index_controller = require('./controllers/index').controller();

module.exports.construct = function(app) {
    console.log("got here");
    //app.get('/', require('./controllers/index').about);
    //app.get('/', index_controller.index);
    app.get('/', function(req,res) {res.send("sdf");});
}