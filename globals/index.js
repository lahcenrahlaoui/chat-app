// !important global colors
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};
const Data = {
    log: (x, textColor = 16) => {
        const keys = Object.keys(x);
        const values = Object.values(x);

        const colorBg = Object.values(colors)[15];
        const colorText = Object.values(colors)[2];
        console.log(
            colorBg,
            colorText,
            "---------------------------------------------"
        );
        console.group(colorBg, colorText, `------------ ${keys} -------------`);
        console.log(colorBg, colorText, values[0]);
        console.groupEnd();
        console.log(
            colorBg,
            colorText,
            "---------------------------------------------"
        );
    },
};
module.exports = Data;
