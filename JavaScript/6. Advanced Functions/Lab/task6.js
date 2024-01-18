function listProcessor(commands) {
    let result = [];

    const obj = {
        add: (string) => result.push(string),
        remove: (string) => result = result.filter(item => item !== string),
        print: () => console.log(result.join(','))
    }

    commands.forEach(c => {
        const [command, value] = c.split(' ');
        obj[command](value);
    });
}

listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);
listProcessor(['add pesho', 'add george', 'add peter', 'remove peter','print']);