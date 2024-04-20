function ticketSorter(ticketsDataArray, sortingCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    const ticketsArray = [];

    ticketsDataArray.map(singleTicketData => {
        singleTicketDataArray = singleTicketData.split('|');

        const newTicket = new Ticket(singleTicketDataArray[0], Number(singleTicketDataArray[1]), singleTicketDataArray[2]);
        ticketsArray.push(newTicket);
    });

    return ticketsArray.sort((a, b) => {
        if (typeof a[sortingCriteria] === 'number') {
            return a[sortingCriteria] - b[sortingCriteria];
        } else {
            return a[sortingCriteria].localeCompare(b[sortingCriteria]);
        }
    });
}

console.log(ticketSorter(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'
));

console.log(ticketSorter(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'status'
));