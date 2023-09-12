import Fastify from 'fastify';
import discordWebhook from './services/discordWebhook.mjs';
import registerPlugins from './plugins.js';
import jsStringify from 'js-stringify';
// import helpers from './helpers/index.mjs';

import tableData from './mockData/tableData.mjs';

// console.log(helpers);

const fastify = Fastify({ logger: true });

registerPlugins(fastify);

fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

fastify.get('/webhook', async (request, reply) => {
    const url = "https://discord.com/api/webhooks/1149688604172488724/WplauZLm0UvYzuJhRE0QQ_tH3hpSI6CnVcuWhylm_HKp-8-HqDG3rc9MC4COTzePtFwd";
    const data = "Hello World! This is Koen testing the discord webhook.";
    await discordWebhook(url, data);
    return { webhook: 'sent' };
});

fastify.get('/remoteWebhook', async (request, reply) => {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2a230f54-c502-4829-aeb0-27a77810a549/default/webhook-example";
    const data = { 
        url: "https://discord.com/api/webhooks/1149688604172488724/WplauZLm0UvYzuJhRE0QQ_tH3hpSI6CnVcuWhylm_HKp-8-HqDG3rc9MC4COTzePtFwd",
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

fastify.post('/remoteWebhook', async (request, reply) => {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2a230f54-c502-4829-aeb0-27a77810a549/default/webhook-example";
    const data = { 
        url: "https://discord.com/api/webhooks/1149688604172488724/WplauZLm0UvYzuJhRE0QQ_tH3hpSI6CnVcuWhylm_HKp-8-HqDG3rc9MC4COTzePtFwd",
        // content: "Hello World! \n## Header"
    };
    console.log(request.body);
    data.content = request.body;
    // data.content = request.query.content;

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

fastify.get('/dashboard', async (request, reply) => {
    return reply.view('./templates/template.pug');
});

fastify.get('/hardwareCheckout', async (request, reply) => {
    return reply.view('./templates/table.pug', {jsStringify, ...tableData});
});
    

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();