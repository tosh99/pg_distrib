const APP_CONSTANTS = {
    hosts: [{
        instance_identifier: "DB_1",
        instance_host: "localhost",
        instance_port: 5500,
        db_parameters: {
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "Piku123.",
            port: 5432,
        }
    }, {
        instance_identifier: "DB_2",
        instance_host: "localhost",
        instance_port: 5500,
        db_parameters: {
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "Piku123.",
            port: 5432,
        }
    }]
}

module.exports = APP_CONSTANTS