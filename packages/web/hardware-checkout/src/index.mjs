import fp from 'fastify-plugin';
import registerViewEngine from './registerViewEngine.js';

// Compile code into a single fastify plugin
export default fp(async function plugin(fastify, options) {
    registerViewEngine(fastify);

    fastify.get('/Bryce', async function (request, reply) {
      reply
        .header('Content-Type', 'text/html')
        .send('<html><h1>Bryce is a cool guy</h1></html>')
    });
  }, {
    name: 'hardware-checkout',
    prefix: '/hardware-checkout'
  })
  