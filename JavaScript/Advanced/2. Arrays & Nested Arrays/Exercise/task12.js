function buildOrbits(args) {
    const width = args[0];
    const height = args[1];

    const x = args[2];
    const y = args[3];

    let space = Array.from({ length: height }, () => Array(width).fill(0));
    space[y][x] = 1;

    const maxOrbitNumber = Math.max(x, y, width - x - 1, height - y - 1) + 1;
    for (let orbit = 2; orbit <= maxOrbitNumber; orbit++) {
        for (let i = -orbit + 1; i < orbit; i++) {
            for (let j = -orbit + 1; j < orbit; j++) {
                const x1 = x + i;
                const y1 = y + j;

                if (x1 >= 0 && x1 < space[0].length && y1 >= 0 && y1 < space.length && space[y1][x1] === 0) {
                    space[y1][x1] = orbit;
                }
            }
        }
    }

    space.forEach((row) => {
        console.log(row.join(' '));
    });
}

buildOrbits([4, 4, 0, 0]);
buildOrbits([5, 5, 2, 2]);
buildOrbits([3, 3, 2, 2]);