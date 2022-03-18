const {getLargestHost} = require("../../services/connections");

async function routes(fastify, options) {
    fastify.get('/init', async (request, reply) => {
        const leader = JSON.stringify(await getLargestHost());
        const {redis} = fastify

        redis.get('leader', (err, val) => {
            if (!val) {
                redis.set('leader', leader, (err, val) => {
                    console.log(val)
                })
            }
        })

        return {status: 'SUCCESS', status_code: 200}
    })


}

module.exports = routes