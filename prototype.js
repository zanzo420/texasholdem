// https://en.wikipedia.org/wiki/Standard_52-card_deck

class PokerCard {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    toString() {
        // \u{1F0A0} == \uD83C\uDCA0
        return String.fromCharCode(0xD83C) + String.fromCharCode(0xDC90 + this.suit * 16 + this.rank);
    }
}

const PokerSuit = {
    NONE: 0,
    SPADE: 1,
    HEART: 2,
    DIAMOND: 3,
    CLUB: 4,
}

const PokerRank = {
    NONE: 0,
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

const HandRankingCategory = {
    // 5 ranks, >1 suits
    HIGH_CARD: 0,
    // 4 ranks, >1 suits
    PAIR: 1,
    // 3 ranks, >1 suits, 2 equal
    TWO_PAIRS: 2,
    // 3 ranks, >1 suits, 3 equal
    THREE_OF_A_KIND: 3,
    // 5 ranks, >1 suits, 5 combos
    STRAIGHT: 4,
    // * ranks, 1 suit
    FLUSH: 5,
    // 2 ranks
    FULL_HOUSE: 6,
    // 2 ranks
    FOUR_OF_A_KIND: 7,
    // 5 ranks, 1 suit, 5 combos
    STRAIGHT_FLUSH: 8,
    // 5 ranks, 1 suit, 5 combos and DIAMOND and ACE leading
    ROYAL_FLUSH: 9
}

class HandRanking {
    constructor(category,
            leadingRank,
            secondRank = PokerRank.NONE,
            thirdRank = PokerRank.NONE,
            forthRank = PokerRank.NONE,
            fifthRank = PokerRank.NONE) {

        this.category = category;
        this.ranks = [PokerRank.NONE,PokerRank.NONE,PokerRank.NONE,PokerRank.NONE,PokerRank.NONE];
        this.ranks[0] = leadingRank;
        this.ranks[1] = secondRank;
        this.ranks[2] = thirdRank;
        this.ranks[3] = forthRank;
        this.ranks[4] = fifthRank;
    }

    toInteger() {
        this.category * 0xF00000
        + this.ranks[0] * 0x0F0000
        + this.ranks[1] * 0x00F000
        + this.ranks[2] * 0x000F00
        + this.ranks[3] * 0x0000F0
        + this.ranks[4];
    }
}

class HandRankingAnalyzer {

    static getNumberOfNonZero(counts) {
        var numberOfNonZero = 0;

        for (var count of counts) {
            if (count > 0) {
                numberOfNonZero ++;
            }
        }

        return numberOfNonZero;
    }

    static getMaxCount(counts) {
        var maxCount = 0;

        for (var count of counts) {
            if (count > maxCount) {
                maxCount = count;
            }
        }

        return maxCount;
    }

    static getMaxCombo(suitsCount) {
        var maxCombo = 0;
        var combo = 0;

        for (var suitCount of suitsCount) {
            if (suitCount > 0) {
                combo ++;
                if (combo > maxCombo) {
                    maxCombo = combo;
                }
            } else {
                combo = 0;
            }
        }

        return maxCombo;
    }

    static getRankingFromCards(cards) {
        var suitsCount = [0,0,0,0];
        var ranksCount = [0,0,0,0,0,0,0,0,0,0,0,0,0];

        for (var card of cards) {
            suitsCount[card.suit-1] += 1;
            ranksCount[card.rank-1] += 1;
        }

        var numberOfSuits = this.getNumberOfNonZero(suitsCount);
        var numberOfRanks = this.getNumberOfNonZero(ranksCount);
        var maxRankCount = this.getMaxCount(ranksCount);
        var maxRankCombo = this.getMaxCombo(ranksCount);

        if (numberOfSuits == 1 && numberOfRanks == 5 && maxRankCombo == 5) {
            // STRAIGHT_FLUSH or ROYAL_FLUSH
            return "STRAIGHT FLUSH";
        } else if (numberOfRanks == 2) {
            if (maxRankCount == 4) {
                // FOUR_OF_A_KIND
                return "FOUR OF A KIND";
            } else {
                // FULL_HOUSE
                return "FULL HOUSE";
            }
        } else if (numberOfSuits == 1) {
            // FLUSH
            return "FLUSH";
        } else if (maxRankCombo == 5) {
            // STRAIGHT
            return "STRAIGHT";
        } else if (numberOfRanks == 3) {
            if (maxRankCount == 3) {
                // THREE_OF_A_KIND
                return "THREE OF A KIND";
            } else {
                // TWO_PAIRS
                return "TWO PAIRS";
            }
        } else if (numberOfRanks == 4) {
            // PAIRS
            return "PAIRS";
        } else {
            // HIGH_CARD
            return "HIGH CARD";
        }
    }
}

class PokerEngine {
    constructor() {
    }

    static createDeck () {
        for (var rank=1; rank <= 13; rank++) {
            for (var suit=1; suit<= 4; suit++) {
                var c = new PokerCard(suit, rank);
                console.log(c.toString())
            }
        }
    }

    
    static getRankingFromCards(cards) {
        return HandRankingAnalyzer.getRankingFromCards(cards);
    }
}

var cards = [
    new PokerCard(PokerSuit.DIAMOND, PokerRank.JACK),
    new PokerCard(PokerSuit.CLUB, PokerRank.JACK),
    new PokerCard(PokerSuit.DIAMOND, PokerRank.JACK),
    new PokerCard(PokerSuit.HEART, PokerRank.JACK),
    new PokerCard(PokerSuit.DIAMOND, PokerRank.QUEEN)
]



PokerEngine.createDeck();
console.log(
    PokerEngine.getRankingFromCards(cards)
)