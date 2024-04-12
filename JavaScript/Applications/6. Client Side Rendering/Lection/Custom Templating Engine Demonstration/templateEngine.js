export async function render(template, data, elementToAppendTo = document.querySelector('main')) {
    const templateText = await (await fetch(`./${template}.html`)).text();
    elementToAppendTo.innerHTML += data.map(e => templateText.replace(/{{(.+?)}}/gm, (match, property) => e[property])).join('');
}