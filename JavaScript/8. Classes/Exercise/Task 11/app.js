class Textbox {
    constructor(selector, invalidSymbolsRegex) {
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = invalidSymbolsRegex;

        Array.from(this.elements).forEach((element) => {
            element.addEventListener('input', (e) => {
                this.value = e.currentTarget.value;
            });
        });
    }

    get value() {
        return this.elements[0].value;
    }

    set value(_value) {
        Array.from(this.elements).forEach((element) => {
            element.value = _value;     
        });
    }

    get elements() {
        return this._elements;
    }

    isValid = () => this.value.match(this._invalidSymbols) ? false : true;
}

let textbox = new Textbox('.textbox', /[^a-zA-Z0-9]/);
let inputs = document.querySelectorAll('.textbox');

inputs.forEach(x => x.addEventListener('input', function () {console.log(x.value)}));