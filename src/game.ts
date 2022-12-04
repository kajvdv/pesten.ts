import Board from './board';
import Card, {Joker} from './card';
import { createCompleteDeck, moveCard, shuffle } from './deck';
import Player from './player';


class Game {

    board: Board;
    currentPlayer: Player;

    constructor(board: Board, currentPlayer: Player) {
        this.board = board;
        this.currentPlayer = currentPlayer;
    }

    static createGame(playerNames: string[], amountOfJokers: number, handSize: number) {
        const cards = createCompleteDeck();
        for (let i = 0; i < amountOfJokers; i++) {
            cards.push(new Joker());
        }
        shuffle(cards);
        const playStack: Card[] = new Array<Card>();
        moveCard(cards, playStack, -1);
        const board = new Board(cards, playStack);

        const firstPlayer = Player.createPlayers(playerNames);
        let player: Player = firstPlayer;
        do {
            for (let i = 0; i < handSize; i++) {
                board.draw(player.hand);
            }
            player = player.nextPlayer;
        } while(player != firstPlayer);

        return new Game(board, firstPlayer!);
    }

    private drawCard() {
        this.board.draw(this.currentPlayer.hand);
    }

    private checkCard(topCard: Card, choosenCard: Card): boolean {
        return choosenCard.isSameSuit(topCard) || choosenCard.isSameValue(topCard);
    }

    private playCard(index: number) {
        this.board.play(this.currentPlayer.hand, index);
    }

    private next() {
        this.currentPlayer = this.currentPlayer.nextPlayer!;
    }

    playTurn(index: number) {
        if (index < 0) {
            this.drawCard();
        }
        const choosenCard = this.currentPlayer.hand[index];
        const topCard = this.board.getTopcard();
        const isValid = this.checkCard(topCard, choosenCard);
        if (!isValid) {
            return;
        }
        this.playCard(index);
        this.next();
    }
}

export default Game;

// import prompt from 'prompt-sync'

// const names = ['Kaj', 'Julia', 'Peter', 'Timon'];
// const game = Game.createGame(names, 3, 8);
// const input = prompt();

// while (true) {
//     console.log(
//         `${game.currentPlayer.name}'s turn\n` +
//         `The top card is ${game.board.getTopcard().getString()}`
//     )
//     for (let i = 0; i < game.currentPlayer.hand.length; i++) {
//         const card = game.currentPlayer.hand[i];
//         console.log((i+1) + ': ' + card.getString());
//     }
//     const choose = input('Choose a Card ');
//     if (choose === 'exit') {
//         break;
//     }
//     const index = Number(choose) - 1;
//     game.playTurn(index);
// }