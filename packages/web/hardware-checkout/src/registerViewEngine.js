const pug = require('pug');
const fastifyView = require('@fastify/view');
const fastifyStatic = require('@fastify/static');
const path = require('path');

// console.log(createTableData);

function registerViewEngine(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
        root: path.join(require.resolve('@ycphacks/hardware-checkout-web'), '..', 'views'),
        propertyName: 'viewHC'
    });

    app.register(fastifyStatic, {
        root: path.join(require.resolve('@ycphacks/hardware-checkout-web'), '..', 'public'),
        prefix: '/public/',
        list: true
    });
    console.log(path.join(require.resolve('@ycphacks/hardware-checkout-web'), '..', 'public'));
}

module.exports = registerViewEngine;