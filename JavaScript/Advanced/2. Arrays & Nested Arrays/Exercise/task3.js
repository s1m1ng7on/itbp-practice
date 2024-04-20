function addAndRemoveElements(commands) {
    let result = [];

    for (let i = 0; i < commands.length; i++) {
        switch (commands[i]) {
            case 'add':
                result.push(i + 1);
                break;
            case 'remove':
                result.pop();
                break;
        }
    }
    
    if (result.length > 0) {
        console.log(result.join('\n'));
    } else {
        console.log("Empty");
    }
}

addAndRemoveElements(['add', 'add', 'add', 'add']);
addAndRemoveElements(['add', 'add','remove', 'add', 'add']);
addAndRemoveElements(['remove', 'remove', 'remove']);