const path = require('path');
const fastifyStatic = require('@fastify/static');

function registerPlugins(app) {
    // Register the static file server
    // This allows us to serve static files like CSS, images, and scripts
    app.register(fastifyStatic, {
        root: path.join(__dirname, '/public'),
        prefix: '/public/',
        list: true
    });
}

module.exports = registerPlugins;