function argumentInfo() {
    let argumentsCounter = {};

    Array.from(arguments).forEach(argument => {
        const argumentType = typeof argument;
        console.log(`${argumentType}: ${argument}`);

        if (!argumentsCounter.hasOwnProperty(argumentType)) argumentsCounter[argumentType] = 0;
        argumentsCounter[argumentType]++;
    });

    console.log(Object.entries(argumentsCounter).sort((a, b) => b[1] - a[1]).map(entry => entry.join(' = ')).join('\n'));
}

argumentInfo('cat', 42, function () { console.log('Hello world!'); });