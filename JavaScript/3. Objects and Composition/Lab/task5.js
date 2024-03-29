function createAssemblyLine() {
    return {
        hasClima: function(car) {
            car.temp = 21;
            car.tempSettings = 21;
            car.adjustTemp = function() {
                if (this.temp < this.tempSettings) {
                    this.temp++;
                } else if (this.temp > this.tempSettings) {
                    this.temp--;
                }
            }
        },
        hasAudio: function(car) {
            car.currentTrack = {
                name: null,
                artist: null
            }
            car.nowPlaying = function() {
                console.log(`Now playing '${this.currentTrack.name}' by ${this.currentTrack.artist}`);
            }
        },
        hasParktronic: function(car) {
            car.checkDistance = function(distance) {
                let distanceMessage;
                if (distance < 0.1) {
                    distanceMessage = 'Beep! Beep! Beep!';
                } else if (distance < 0.25) {
                    distanceMessage = 'Beep! Beep!';
                } else if (distance < 0.5) {
                    distanceMessage = 'Beep!';
                } else {
                    distanceMessage = '';
                }
                console.log(distanceMessage);
            }
        }
    };
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();

assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

console.log(myCar);