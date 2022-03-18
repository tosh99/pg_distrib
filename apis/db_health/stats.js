const {getCurrentMachineStats} = require("./db_load_balancer/load_balancer");

async function routes(fastify, options) {
    fastify.get('/stats', async (request, reply) => {
        return getCurrentMachineStats();
    })
}

module.exports = routes