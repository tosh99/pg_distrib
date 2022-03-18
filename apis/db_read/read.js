const {getFastestHostConnectionPool} = require("../../services/connections");

async function routes(fastify, options) {
    fastify.get('/read', async (request, reply) => {
        // const {redis} = fastify
        // const t1 = new Date().valueOf()

        // redis.set('my_key', 'Hi', (err, val) => {
        //     console.log(val)
        // })
        // redis.get('my_key', (err, val) => {
        //     console.log(val)
        // })

        // console.log(new Date().valueOf()  - t1)

        // Step 1 - Get Most Updated
        const pool = await getFastestHostConnectionPool()
        const res = await pool.query('select * from companies', [])
        await pool.end()

        return {data: res.rows}
    })
}

module.exports = routes