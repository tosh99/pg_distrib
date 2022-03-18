async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        return {hello: 2}
    })
}

module.exports = routes