const colorMap = {
    html: {
        '0': '#000000', 
        '1': '#0000AA', 
        '2': '#00AA00', 
        '3': '#00AAAA', 
        '4': '#AA0000', 
        '5': '#AA00AA', 
        '6': '#FFAA00', 
        '7': '#AAAAAA', 
        '8': '#555555', 
        '9': '#5555FF', 
        'a': '#55FF55', 
        'b': '#55FFFF',
        'c': '#FF5555', 
        'd': '#FF55FF', 
        'e': '#FFFF55', 
        'f': '#FFFFFF', 
        'l': 'font-weight: bold;', 
        'm': 'text-decoration: line-through;', 
        'n': 'text-decoration: underline;',
        'o': 'font-style: italic;',
        'r': '',
        'k': ''
    },
    console: {
        '0': '\x1b[30m',
        '1': '\x1b[34m',
        '2': '\x1b[32m',
        '3': '\x1b[36m',
        '4': '\x1b[31m',
        '5': '\x1b[35m',
        '6': '\x1b[33m',
        '7': '\x1b[37m',
        '8': '\x1b[90m',
        '9': '\x1b[94m',
        'a': '\x1b[92m',
        'b': '\x1b[96m',
        'c': '\x1b[91m',
        'd': '\x1b[95m',
        'e': '\x1b[93m',
        'f': '\x1b[97m',
        'l': '\x1b[1m',
        'm': '\x1b[9m',
        'n': '\x1b[4m',
        'o': '\x1b[3m',
        'r': '\x1b[0m',
        'k': ''
    }
};

function translateToHtml(text) {
    const escapedText = text.replace(/</g, '<').replace(/>/g, '>');
    let result = '';
    let styles = [];

    for (let i = 0; i < escapedText.length; i++) {
        if (escapedText[i] === '§' && i + 1 < escapedText.length) {
            const code = escapedText[i + 1];
            i++;

            if (colorMap.html[code]) {
                if (styles.length) {
                    result += `</span>`;
                }

                if (code === 'r') {
                    styles = [];
                } else if ('0123456789abcdef'.includes(code)) {
                    styles = [`color: ${colorMap.html[code]};`];
                } else {
                    styles.push(colorMap.html[code]);
                }

                if (styles.length) {
                    result += `<span style="${styles.join(' ')}">`;
                }
            }
        } else {
            result += escapedText[i];
        }
    }

    if (styles.length) {
        result += `</span>`;
    }

    return result
}

function translateToConsole(text) {
    let result = '';
    let reset = '\x1b[0m';

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '§' && i + 1 < text.length) {
            const code = text[i + 1];
            i++;

            if (colorMap.console[code]) {
                result += colorMap.console[code];
            }
        } else {
            result += text[i];
        }
    }

    result += reset;
    return result;
}

function stripMinecraftColors(text) {
    return text.replace(/§[0-9a-fk-or]/g, '');
}

module.exports = {
    translateToHtml,
    translateToConsole,
    stripMinecraftColors
};