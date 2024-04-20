function isWithinSpeedLimit(speed, area) {
    if (typeof(speed) === 'number' && typeof(area) === 'string') {
        let areaSpeedLimit;
        switch (area) {
            case 'motorway':
                areaSpeedLimit = 130;
                break;
            case 'interstate':
                areaSpeedLimit = 90;
                break;
            case 'city':
                areaSpeedLimit = 50;
                break;
            case 'residential':
                areaSpeedLimit = 20;
                break;
            default:
                throw Error('Invalid input. Please provide valid area.');
        }
        
        let outputMessage;
        let speedDifference = speed - areaSpeedLimit;
        if (speed <= areaSpeedLimit) {
            outputMessage = `Driving ${speed} km/h in a ${areaSpeedLimit} zone.`;
        } else {
            let status;
            const speedDifference = speed - areaSpeedLimit;
            if (speedDifference <= 20) {
                status = 'speeding';
            } else if (speedDifference <= 40) {
                status = 'excessive speeding';
            } else {
                status = 'reckless driving';
            }

            outputMessage = `The speed is ${speedDifference} km/h faster than the allowed speed of ${areaSpeedLimit} - ${status}.`;
        }

        console.log(outputMessage);
    } else {
        throw Error('Invalid input. Please provide valid arguments.');
    }
}

isWithinSpeedLimit(40, 'city');
isWithinSpeedLimit(21, 'residential');
isWithinSpeedLimit(120, 'interstate');
isWithinSpeedLimit(200, 'motorway');