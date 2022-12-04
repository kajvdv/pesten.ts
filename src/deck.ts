import Card from "./card";


export function shuffle(cards: Card[]) {
    for (let index = cards.length - 1; index > 0; index--) {
        const newIndex = Math.floor(Math.random() * (index + 1));
        [cards[index], cards[newIndex]] = [cards[newIndex], cards[index]];
    }
}

export function moveCard(source: Card[], destination: Card[], index: number) {
    const card = source.splice(index, 1)[0];
    if (card) {
        destination.push(card);
    } else {
        throw new RangeError('Wrong index on source deck');
    }
}

export function moveCards(source: Card[], destination: Card[]) {
    for (let i = source.length-1; i >= 0 ; i--) {
        moveCard(source, destination, i);
    }
}

export function createCompleteDeck(): Card[] {
    let cards: Card[] = new Array<Card>();
    for (let suit = 0; suit < 4; suit += 1){
        for (let value = 0; value < 13; value += 1){
            cards.push(new Card(value, suit));
        }
    }
    return cards;
}
