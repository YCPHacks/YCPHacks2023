const pug = require('pug');
const fastifyView = require('@fastify/view');
const path = require('path');
// console.log(createTableData);

function registerViewEngine(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
        root: path.join(require.resolve('@ycphacks/event-control-panel-web'), '..', 'views'),
        propertyName: 'viewDD'
    });

    app.get('/dashboard', async function (request, reply) {
        return reply.viewDD('dashboard.pug');
    });
}

module.exports = registerViewEngine;