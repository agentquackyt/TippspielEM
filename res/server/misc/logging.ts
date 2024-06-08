let development: boolean = true;

export const Logger = {
    http: (req: Request) => {
        if (development) console.log(Color.yellow + req.method + Color.reset + " " + req.url)
    },
    error: (message: string) => {
        if (development) console.log(Color.bold + Color.red + "ERROR: " + Color.reset + message)
    },
    info: (message: string) => {
        if (development) console.log(Color.bold + Color.blue + "[info] " + Color.reset + message)
    },
    ws: (message: string) => {
        if (development) console.log(Color.bold + Color.green + "WS " + Color.reset + message)
    },
    debug: (message: any) => {
        if (!development) return;
        console.log(Color.bold + Color.magenta + "[debug] " + Color.reset);
        Object.keys(message).forEach(key => {
            console.log(key + ": " + JSON.stringify(message[key]));
        });
    },
}

export const Color = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m",
    red_bg: "\x1b[41m",
    green_bg: "\x1b[42m",
    yellow_bg: "\x1b[43m",
    blue_bg: "\x1b[44m",
    magenta_bg: "\x1b[45m",
    cyan_bg: "\x1b[46m",
    white_bg: "\x1b[47m",

    bold: "\x1b[1m",
    underline: "\x1b[4m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
}