function printDeckOfCards(cards) {
    function createCard(face, suit) {
        const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        const validSuits = {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        }

        if (!validFaces.includes(face) || !Object.keys(validSuits).includes(suit)) {
            throw new Error(`Invalid card: ${face}${suit}`);
        }

        return {
            face,
            suit: validSuits[suit],
            toString() {
                return `${this.face}${this.suit}`;
            }
        }
    }

    let cardsUtf = [];
    cards.forEach(card => {
        try {
            const newCardFace = card.substring(0, card.length - 1);
            const newCardSuit = card[card.length - 1];

            const newCard = createCard(newCardFace, newCardSuit);
            cardsUtf.push(newCard);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    });

    console.log(cardsUtf.join(' '));
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);