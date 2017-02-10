// https://en.wikipedia.org/wiki/Standard_52-card_deck

class Poker {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    toString() {
        // \u{1F0A0} == \uD83C\uDCA0
        return String.fromCharCode(0xD83C)
        + String.fromCharCode(0xDCA0 + suit*16 + rank);
    }
}

const PokerSuit = {
    SPADE: 1,
    HEART: 2,
    DIAMOND: 3,
    CLUB: 4,
}

const PokerRank = {
    ACE: 1,
    RANK2: 2,
    RANK3: 3,
    RANK4: 4,
    RANK5: 5,
    RANK6: 6,
    RANK7: 7,
    RANK8: 8,
    RANK9: 9,
    RANK10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13
}

function createDeck () {
    for (rank=1; rank <= 13; rank++) {
        for (suit=1; suit<= 4; suit++) {
            var p = new Poker(suit, rank);
            console.log(p.toString())
        }
    }
}

createDeck();