const pug = require('pug');
const fastifyView = require('@fastify/view');
const path = require('path');

function registerViewEngine(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
        root: path.join(require.resolve('@ycphacks/core-web'), '..', 'views'),
        propertyName: 'viewCore'
    });

    app.setErrorHandler(async function (error, request, reply) {
        console.log(error);
        if(error instanceof Fastify.errorCodes.FST_ERR_NOT_FOUND){
            return reply.viewCore('404.pug');
        } else {
            return reply.send(error);
        }
    });
}

module.exports = registerViewEngine;