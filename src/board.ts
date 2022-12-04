import Card from './card';
import {moveCard, moveCards, shuffle} from './deck'

class Board {

    drawStack: Card[];
    playStack: Card[];

    constructor(drawStack: Card[], playStack: Card[]) {
        this.drawStack = drawStack;
        this.playStack = playStack;
    }

    reshuffleBoard() {
        const topCard = this.playStack.pop();
        if (topCard) {
            shuffle(this.playStack);
            moveCards(this.playStack, this.drawStack);
            this.playStack.push(topCard);
        } else {
            throw Error('Playstack was empty');
        }
    }

    getTopcard(): Card {
        const topCard = this.playStack.at(-1);
        if (topCard) {
            return topCard
        } else {
            throw new Error('No card on the playstack');
        }
    }

    draw(destination: Card[]) {
        moveCard(this.drawStack, destination, -1);
    }

    play(source: Card[], index: number): void {
        moveCard(source, this.playStack, index);
    }
}

export default Board;