const {getConnectionClientFromHost} = require("../../services/connections");
const APP_CONSTANTS = require("../../services/constants/constants");
const {getCurrentLeader} = require("./leader/leader");

async function routes(fastify, options) {
    fastify.get('/sync', async (request, reply) => {
        const {redis} = fastify

        let leader = await getCurrentLeader(redis);
        const leader_client = await getConnectionClientFromHost(leader)

        const hosts = JSON.parse(JSON.stringify(APP_CONSTANTS.hosts))
        for (const host of hosts) {
            const follower_client = await getConnectionClientFromHost(host);
            const follower_tables = await follower_client.query("SELECT * FROM pg_catalog.pg_tables where schemaname = 'public'")

            // Loop Through Follower Tables
            for (const follower_table_row of follower_tables.rows) {
                const table_name = follower_table_row.tablename
                console.log(table_name)

                const leader_table_rows = await leader_client.query(`SELECT *
                                                                     FROM ${table_name}`)
                const follower_table_rows = await follower_client.query(`SELECT *
                                                                         FROM ${table_name}`)

                for (const leader_table_row of leader_table_rows.rows) {
                    let is_found = false

                    for (const follower_table_row of follower_table_rows.rows) {
                        if (JSON.stringify(follower_table_row) === JSON.stringify(leader_table_row)) {
                            is_found = true;
                            break;
                        }
                    }


                    if (!is_found) {
                        console.log('Not Found')

                        let columns = [];
                        let column_values = [];

                        for (const column in leader_table_row) {
                            columns.push(column)
                            column_values.push(leader_table_row[column])
                        }

                        columns = '(' + columns.toString() + ')'
                        column_values = '(' + column_values.toString() + ')'


                        const query = `insert into ${follower_table_row.tablename} ${columns}
                        values
                        ${column_values}`

                        // await follower_table_rows.query(query)
                    }
                }
            }


            await follower_client.end()
        }

        return {status: 'SUCCESS', status_code: 200}
    })


}

module.exports = routes