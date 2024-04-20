function solve() {
    function addMovieOnScreen(name, hall, ticketPrice) {
        const movieNameSpanElement = document.createElement('span');
        movieNameSpanElement.textContent = name;

        const movieHallStrongElement = document.createElement('strong');
        movieHallStrongElement.textContent = `Hall: ${hall}`;

        const movieDetailsDivElement = document.createElement('div');
        
        const moviePriceStrongElement = document.createElement('strong');
        moviePriceStrongElement = `${ticketPrice.toFixed(2)}`;

        const movieTicketsSoldInputElement = document.createElement('input');
        movieTicketsSoldInputElement.placeholder = 
    }
}