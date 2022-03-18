const axios = require("axios");
const {Pool, Client} = require("pg");
const APP_CONSTANTS = require("./constants/constants");

const getSpeed = async (host, key = 'overall_speed') => {
    const url = 'http://' + host.instance_host + ':' + host.instance_port + '/stats'
    return await axios.get(url).then((resp) => {
        return resp.data[key];
    }, (err) => {
        return 0
    })
}

const getLargestHost = async () => {
    const hosts = JSON.parse(JSON.stringify(APP_CONSTANTS.hosts))
    for (const host of hosts) {
        host.total_cpu = await getSpeed(host, 'total_cpu');
    }

    let largest_host = {};
    let largest_cpu = 0;

    for (const host of hosts) {
        if (host.total_cpu > largest_cpu) {
            largest_cpu = host.total_cpu
            largest_host = host;
        }
    }

    return largest_host
}

const getFastestHostConnectionPool = async () => {
    const hosts = JSON.parse(JSON.stringify(APP_CONSTANTS.hosts))
    for (const host of hosts) {
        host.overall_speed = await getSpeed(host);
    }

    let fastest_host = {};
    let fastest_speed = 0;

    for (const host of hosts) {
        if (host.overall_speed > fastest_speed) {
            fastest_speed = host.overall_speed
            fastest_host = host;
        }
    }

    const host_db = fastest_host.db_parameters
    return new Pool(host_db);
}

const getConnectionPoolFromHost = async (host) => {
    return new Pool(host.db_parameters);
}

const getConnectionClientFromHost = async (host) => {
    const client = new Client(host.db_parameters)
    await client.connect()

    return client;
}

module.exports = {
    getLargestHost: getLargestHost,
    getFastestHostConnectionPool: getFastestHostConnectionPool,
    getConnectionPoolFromHost: getConnectionPoolFromHost,
    getConnectionClientFromHost: getConnectionClientFromHost,
};