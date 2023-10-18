// Compile code into a single fastify plugin
import fp from 'fastify-plugin';
import registerViewEngine from './registerViewEngine.js';


// A default fastify plugin
export default fp(async function plugin(fastify, options) {
    registerViewEngine(fastify);
  }, {
    name: 'event-control-panel',
    encapsulate: true,
  });
  