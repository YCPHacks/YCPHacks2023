import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function plugin(fastify, options) {
    fastify.get("/hardware-checkout", async function (request, reply) {
        reply.header("Content-Type", "text/html").send("<html><h1>Hardware Checkout API</h1></html>");
    });
    }, {
    name: "hardware-checkout"
});