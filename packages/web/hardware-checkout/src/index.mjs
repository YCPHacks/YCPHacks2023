import fp from 'fastify-plugin';
import registerViewEngine from './registerViewEngine.js';
import createTableData from './utils/tableData.mjs';
import jsStringify from 'js-stringify';

// Compile code into a single fastify plugin
export default fp(async function plugin(fastify, options) {
    registerViewEngine(fastify);

    fastify.get('/', async function (request, reply) {
      reply.redirect('/hardware-checkout/inventory');
    });

    fastify.get('/inventory', async function (request, reply) {
      // const templatePath = path.join(require.resolve('@ycphacks/hardware-checkout'), 'src/views/hardware-inventory.pug');
      // console.log(path.join(require.resolve('@ycphacks/hardware-checkout')));
      return reply.viewHC('hardware-inventory.pug', {jsStringify, ...(await createTableData())});
    });

    fastify.get('/new-equipment', async function (request, reply) {
      return reply.viewHC('new-equipment.pug');
    });

    fastify.get('/hardware/:id', async function (request, reply) {
      return reply.viewHC('hardware.pug');
    });
    fastify.get('/dropdown', async function (request, reply) {
      return reply.viewHC('dropdown.pug');
    });
  }, 
  {
    name: 'hardware-checkout',
    encapsulate: true,
  });
  