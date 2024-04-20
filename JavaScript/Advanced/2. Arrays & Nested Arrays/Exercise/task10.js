function playTicTacToe(moves) {
    let dashboard = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];

    let currentPlayer = 'X';
    for (let i = 0; i < moves.length; i++) {
        const moveCoordinates = moves[i].split(' ').map(Number);

        if (!dashboard[moveCoordinates[0]][moveCoordinates[1]]) {
            dashboard[moveCoordinates[0]][moveCoordinates[1]] = currentPlayer;
            if (checkWinner(moveCoordinates[0], moveCoordinates[1])) {
                console.log(`Player ${currentPlayer} wins!`);
                printDashboard();
                return;
            } else {
                currentPlayer = nextPlayer();
            }
        } else {
            console.log('This place is already taken. Please choose another!');
        }
    }

    console.log("The game ended! Nobody wins :(");
    printDashboard();

    function nextPlayer() {
        return currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner(row, column) {
        //Check rows
        if (dashboard[row][0] === currentPlayer &&
            dashboard[row][1] === currentPlayer &&
            dashboard[row][2] === currentPlayer) {
            return true;
        }

        //Check columns
        if (dashboard[0][column] === currentPlayer &&
            dashboard[1][column] === currentPlayer &&
            dashboard[2][column] === currentPlayer) {
            return true;
        }

        //Check diagonals
        if ((dashboard[0][0] === currentPlayer && dashboard[1][1] === currentPlayer && dashboard[2][2] === currentPlayer) ||
            (dashboard[0][2] === currentPlayer && dashboard[1][1] === currentPlayer && dashboard[2][0] === currentPlayer)) {
            return true;
        }

        return false;
    }

    function printDashboard() {
        dashboard.forEach((row) => {
            console.log(row.join('\t'));
        });
    }
}

playTicTacToe([
    '0 1',
    '0 0',
    '0 2',
    '2 0',
    '1 0',
    '1 1',
    '1 2',
    '2 2',
    '2 1',
    '0 0'
]);

playTicTacToe([
    '0 0',
    '0 0',
    '1 1',
    '0 1',
    '1 2',
    '0 2',
    '2 2',
    '1 2',
    '2 2',
    '2 1'
]);

playTicTacToe([
    '0 1',
    '0 0',
    '0 2',
    '2 0',
    '1 0',
    '1 2',
    '1 1',
    '2 1',
    '2 2',
    '0 0'
]);