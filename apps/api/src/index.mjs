import 'dotenv/config'; 
import Fastify from 'fastify';
import registerPlugins from './registerPlugins.js';

import hardwareCheckout from "@ycphacks/hardware-checkout-api";

const fastify = Fastify({ logger: true });

registerPlugins(fastify);

fastify.register(hardwareCheckout);

const start = async () => {
    try {
        await fastify.listen(process.env.PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();