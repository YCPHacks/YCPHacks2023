import fp from 'fastify-plugin';
import registerViewEngine from './registerViewEngine.js';

// Compile code into a single fastify plugin
export default fp(async function plugin(fastify, options) {
    registerViewEngine(fastify);
  }, {
    name: 'core',
  })