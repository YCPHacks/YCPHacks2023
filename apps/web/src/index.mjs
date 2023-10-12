// Start up the web server here, locally should run on a different port than the API server
// Should compile all of the fastify plugins into a single fastify instance

import 'dotenv/config'; 
import Fastify from 'fastify';

// import registerPlugins from './plugins.js';
// import jsStringify from 'js-stringify';
import eventControlPanel from "@ycphacks/event-control-panel-web";
import hardwareCheckout from "@ycphacks/hardware-checkout-web";

console.log(hardwareCheckout);

// Creates a new Fastify instance
const fastify = Fastify({ logger: true });

fastify.register(eventControlPanel);

fastify.register(hardwareCheckout);

// Register plugins
// registerPlugins(fastify);

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();