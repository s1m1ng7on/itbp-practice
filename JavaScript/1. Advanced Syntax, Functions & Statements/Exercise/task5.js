function calculateTimeToWalk(stepsNumber, footprintLength, speed) {
    if (typeof(stepsNumber) === 'number' && typeof(footprintLength) === 'number' && typeof(speed) === 'number') {
        const distance = stepsNumber * footprintLength;
        const speedInMetersPerSecond = speed / 3.6;

        let timeToWalk = Math.floor(distance / speedInMetersPerSecond);
        const breakTime = Math.floor(distance / 500) * 60;
        timeToWalk += breakTime;

        const hours = Math.floor(timeToWalk / 3600);
        const minutes = Math.floor((timeToWalk % 3600) / 60);
        const seconds = Math.floor(timeToWalk % 60);

        console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else {
        throw Error('Invalid input. Please provide valid numbers.');
    }
}

calculateTimeToWalk(2564, 0.70, 5.5);