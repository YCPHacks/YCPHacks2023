const cors = require('fastify-cors');


function registerPlugins(app) {
    if (process.env.NODE_ENV === 'development') {
        fastify.register(cors, {
            origin: 'http://localhost:3000'
        });
    }
}

module.exports = registerPlugins;