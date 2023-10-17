// Start up the web server here, locally should run on a different port than the API server
// Should compile all of the fastify plugins into a single fastify instance

import 'dotenv/config'; 
import Fastify from 'fastify';

import registerPlugins from './plugins.js';
import eventControlPanel from "@ycphacks/event-control-panel-web";
import hardwareCheckout from "@ycphacks/hardware-checkout-web";
import core from "@ycphacks/core-web"

// Creates a new Fastify instance
const fastify = Fastify({ logger: true });

// Register each sub-app as a plugin
fastify.register(core);
fastify.register(eventControlPanel, {
    prefix: '/event-control-panel'
});
fastify.register(hardwareCheckout, {
    prefix: '/hardware-checkout'
});

// Register plugins
registerPlugins(fastify);

const start = async () => {
    try {
        await fastify.listen(process.env.PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exitCode = 1;
    }
};

start();