module.exports.controller = function() {
    index_action = function(req, res) {
        if (req == undefined) {
            console.log("req undefined!");
        } else {
        console.log(req);
        res.render('index', {title: 'Express'});
        }
    }

    return {index: index_action};
}

