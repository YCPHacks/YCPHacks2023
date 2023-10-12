const pug = require('pug');
const fastifyView = require('@fastify/view');
const path = require('path');
const jsStringify = require('js-stringify');


// console.log(createTableData);

function registerViewEngine(app) {
    app.register(fastifyView, {
        engine: {
            pug: pug,
        },
        root: path.join(require.resolve('@ycphacks/hardware-checkout-web'), '..', 'views'),
        propertyName: 'viewHC'
    });

    app.get('/inventory', async function (request, reply) {
        const { default: createTableData } = await import('./utils/tableData.mjs');
        // const templatePath = path.join(require.resolve('@ycphacks/hardware-checkout'), 'src/views/hardware-inventory.pug');
        // console.log(path.join(require.resolve('@ycphacks/hardware-checkout')));
        return reply.viewHC('hardware-inventory.pug', {jsStringify, ...(await createTableData())});
    });

    app.get('/new-equipment', async function (request, reply) {
        return reply.viewHC('new-equipment.pug');
    });
}

module.exports = registerViewEngine;