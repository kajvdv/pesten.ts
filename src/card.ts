
export enum Suit{
    Hearts,
    Spades,
    Diamonds,
    Clubs,
    Empty,
}

export enum Value {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
    Empty,
}

class Card {

    value: Value;
    suit: Suit;

    constructor(value: Value, suit: Suit) {
        this.value = value;
        this.suit = suit;
    }

    isSameSuit(card: Card): boolean {
        if (card == this) {
            return false;
        }
        return this.suit === card.suit || card.isSameSuit(card);
    }

    isSameValue(card: Card): boolean {
        if (card == this) {
            return false;
        }
        return this.value === card.value || card.isSameValue(card);
    }

    getString(): string {
        return Value[this.value] + " of " + Suit[this.suit]
    }
}

export class Joker extends Card {
    constructor() {
        super(Value.Empty, Suit.Empty);
    }

    isSameSuit(card: Card): boolean {
        return true;
    }

    isSameValue(card: Card): boolean {
        return true;
    }

    getString(): string {
        return "Joker";
    }
}

export default Card;