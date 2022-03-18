const roundOffDecimals = (value, decimal = 2) => {
    if (decimal === 0) {
        const two_decimal_num = roundOffDecimals(value, 2);
        const num = Math.floor(value);

        if (two_decimal_num - num === 0.5) {
            if (num % 2 === 0) {
                return num;
            } else {
                return Math.round(value);
            }
        }
    }
    return parseFloat(parseFloat(value).toFixed(decimal))
}

module.exports = {
    roundOffDecimals
}

