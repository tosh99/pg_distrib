const {getLargestHost} = require("../../../services/connections");

const selectLeader = async () => {
    const leader = await getLargestHost();
}

const getCurrentLeader = async (redis) => {
    return JSON.parse(await redis.get('leader', (err, val) => {
        if (val) {
            return val
        } else {
            return '{}'
        }
    }))
}


module.exports = {
    selectLeader: selectLeader,
    getCurrentLeader: getCurrentLeader
};