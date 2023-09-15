import 'dotenv/config'; 
import Fastify from 'fastify';
import discordWebhook from './services/discordWebhook.mjs';
import registerPlugins from './plugins.js';
import jsStringify from 'js-stringify';

// import helpers from './helpers/index.mjs';

import tableData from './mockData/tableData.mjs';

// console.log(helpers);

// Creates a new Fastify instance
const fastify = Fastify({ logger: true });

// Register plugins
registerPlugins(fastify);

// Declare a default route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

// Declare a /webhook route
// This route sends a default message to a discord webhook
fastify.get('/webhook', async (request, reply) => {
    const url = process.env.DISCORD_WEBHOOK;
    const data = "Hello World! This is Koen testing the discord webhook.";
    await discordWebhook(url, data);
    return { webhook: 'sent' };
});

// Declare a /remoteWebhook route
// This route sends a message to our DigitalOcean Function with a default message
fastify.get('/remoteWebhook', async (request, reply) => {
    const url = process.env.DIS;
    const data = { 
        url: process.env.DISCORD_WEBHOOK,
        content: "Hello World! \n## Header"
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options);
    return { 
        webhook: 'sent',
        response: response
    };
});

// Declare a /remoteWebhook route
// This route sends a message to our DigitalOcean Function with a custom message
fastify.post('/remoteWebhook', async (request, reply) => {
    const url = process.env.FUNNY_URL;
    const data = { 
        url: process.env.DISCORD_WEBHOOK,
    };

    // Sets the content of the message to the request body
    data.content = request.body;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options);
    return { 
        webhook: 'sent',
        response: response
    };
});

// Declare a /dashboard route
// This route renders a dashboard using the Pug template engine
fastify.get('/dashboard', async (request, reply) => {
    return reply.view('./templates/template.pug');
});

// Declare a /hardwareCheckout route
// This route renders a table using the Pug template engine
fastify.get('/hardwareCheckout', async (request, reply) => {
    // For right now, the table data is passed through to the template from a mock data file
    // In the future, this data will be pulled from a database and then modified to fit the template
    // The three dots before tableData is called the spread operator
    // It takes the properties of the tableData object and spreads them out into the object passed to the template
    // This is done so that we can pass properties of the tableData object directly
    return reply.view('./templates/table.pug', {jsStringify, ...tableData});
});
    
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