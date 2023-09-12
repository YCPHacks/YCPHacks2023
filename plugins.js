const path = require('path');
const fastifyView = require('@fastify/view');
const fastifyStatic = require('@fastify/static');
const pug = require('pug');

function registerPlugins(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
    });

    app.register(fastifyStatic, {
        root: path.join(__dirname, '/public'),
        prefix: '/public/',
        list: true
    });
}

module.exports = registerPlugins;