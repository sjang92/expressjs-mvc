
/* =========================================================================== 
 * ======================= Trying MVC with express ===========================
 * =========================================================================*/

/* module mymodule
 * ===================================
 * Declare module and export. initialize function has to be called. */

mymodule = {

    /* initialize 
     * ==============================
     * load dependencies & external node modules, setup engines */ 
    initialize: function() {
        
        // load modules
        this.express = require('express');
        this.path = require('path');
        this.favicon = require('static-favicon');
        this.logger = require('morgan');
        this.cookieParser = require('cookie-parser');
        this.bodyParser = require('body-parser');

        // initialize main express app.
        this.app = this.express();

        // attach view engine to app
        this.app.set('views', this.path.join(__dirname, 'views')); // view files are in /views/
        this.app.set('view engine', 'jade');
        
        // attach modules to app
        this.app.use(this.favicon());
        this.app.use(this.logger('dev'));
        this.app.use(this.bodyParser.json());
        this.app.use(this.bodyParser.urlencoded());
        this.app.use(this.cookieParser());
        this.app.use(this.express.static(this.path.join(__dirname, 'public'))); // static files are in /public/
    },
    
    /* setErrorHandlers
     * ===============================
     * set error handlers for routing */
    setErrorHandlers: function() {
        if (this.app == undefined) {    
            console.log("caught an attempt to set error handlers without initializing");
        } else {
            
            // Catch 404 Error and forward to error handler 
            this.app.use(function(req, res, next) {
                console.log("Caught 404 Error");
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });

            // Error Handlers

            // 1) Dev Error Handler. print stack trace
            if (this.app.get('env') === 'development') {
                this.app.use(function(err, req, res, next) {
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                });
            }

            // 2) Production Error Handler

            this.app.use(function(err, req,res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            });
        }
    },
    
    /* setRouters
     * ================================
     * */
    setRouters: function() {
        // get all routes 
        this.routes = require('./routes').construct(this.app);

    }
}

mymodule.initialize();
mymodule.setErrorHandlers();
mymodule.setRouters();

module.exports = mymodule.app;

