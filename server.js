// ESM
const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-redis'), { host: '127.0.0.1', port: 6379 })
fastify.register(require('./apis/default'))
fastify.register(require('./apis/db_init/init'))
fastify.register(require('./apis/db_sync/sync'))
fastify.register(require('./apis/db_read/read'))
fastify.register(require('./apis/db_write/write'))
fastify.register(require('./apis/db_health/stats'))

fastify.listen(5500, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})