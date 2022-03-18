const os = require("os");
const {roundOffDecimals} = require("../../../services/common");

const getCurrentMachineStats = () => {
    const cpus = os.cpus();

    // Memory
    const total_memory = os.totalmem();
    const free_mem_percentage = roundOffDecimals((100 * os.freemem() / os.totalmem()), 2)

    // CPU
    const total_cpu = cpus.length;
    const idle_cpu_percentages = [];
    for (const cpu of cpus) {
        let total = 0;
        for (const key in cpu.times) {
            total += cpu.times[key]
        }

        idle_cpu_percentages.push(cpu.times.idle * 100 / total)
    }

    const multi_cpu_sum = idle_cpu_percentages.reduce((a, b) => a + b, 0);
    const multi_cpu_idle_average_percentage = roundOffDecimals((multi_cpu_sum / idle_cpu_percentages.length) || 0, 2)

    // Overall
    const overall_speed = roundOffDecimals((multi_cpu_idle_average_percentage + free_mem_percentage) / 2, 2)
    return {
        idle_cpu_percentage: multi_cpu_idle_average_percentage,
        free_mem_percentage: free_mem_percentage,
        overall_speed: overall_speed,
        total_memory: total_memory,
        total_cpu: total_cpu
    }
}

module.exports = {
    getCurrentMachineStats: getCurrentMachineStats
};