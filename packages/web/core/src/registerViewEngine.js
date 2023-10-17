const pug = require('pug');
const fastifyView = require('@fastify/view');
const fastifyStatic = require('@fastify/static');
const path = require('path');

function registerViewEngine(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
        root: path.join(require.resolve('@ycphacks/core-web'), '..', 'views'),
    });
}

module.exports = registerViewEngine;