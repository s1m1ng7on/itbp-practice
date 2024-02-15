function classHierarchy() {
    class Figure {
        #units = {
            m: 100,
            cm: 1,
            mm: 2
        }

        #currentUnit = units[1];

        get area() {

        }

        changeUnits() {

        }

        toString() {
            return `Figures units: ${this.#currentUnit}`;
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            this.radius = radius;
        }

        get area() {
            return Math.PI * Math.pow(this.radius, 2);
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {

        }
    }
} 