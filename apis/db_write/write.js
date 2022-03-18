const APP_CONSTANTS = require("../../services/constants/constants");
const axios = require("axios");

async function routes(fastify, options) {
    fastify.get('/write_internal', async (request, reply) => {
        return {wrote: 'world'}
    })


    fastify.get('/write', async (request, reply) => {
        for (const host of APP_CONSTANTS.hosts) {
            const url = 'http://' + host.host + ':5500/write_internal'
            axios.get(url).then((resp) => {

            }, (err) => {
                return 0
            })
        }
        return {wrote: 'world'}
    })
}

module.exports = routes