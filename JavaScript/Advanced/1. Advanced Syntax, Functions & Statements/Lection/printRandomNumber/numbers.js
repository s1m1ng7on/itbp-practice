function printRandomNumber() {
    let randomNumber = Math.round(Math.random() * 100);
    console.log(typeof(randomNumber));
    document.body.innerHTML += `<p>${randomNumber}</p>`;
}