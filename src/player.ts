import Card from './card';
import {moveCard} from './deck';


class Player {

    name: string;
    hand: Card[];
    nextPlayer: Player;
    previousPlayer: Player;

    constructor(name: string, hand: Card[] = new Array<Card>(), previousPlayer: Player = undefined!) {
        this.name = name;
        this.hand = hand;
        if (previousPlayer) {
            this.previousPlayer = previousPlayer;
            this.nextPlayer = previousPlayer.nextPlayer;
            previousPlayer.nextPlayer = this;
            this.nextPlayer!.previousPlayer = this
        } else {
            this.nextPlayer = this;
            this.previousPlayer = this
        }
    }

    static createPlayers(names: string[]) {
        let player: Player;
        for (const name of names) {
            player = new Player(name, [], player!);
        }
        return player!.nextPlayer;
    }
}

export default Player;