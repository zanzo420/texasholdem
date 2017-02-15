// https://en.wikipedia.org/wiki/Standard_52-card_deck

// Card class
class Card {
    // Contains a suit and a rank
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    // A Card has an unique id.
    toInteger() {
        return this.suit * 16 + this.rank;
    }

    // To an unique code string
    toString() {
        // \u{1F0A0} == \uD83C\uDCA0
        return String.fromCharCode(0xD83C) + String.fromCharCode(0xDC90 + this.toInteger());
    }
}

// Suit enum
const Suit = {
    NONE: 0,
    SPADE: 1,
    HEART: 2,
    DIAMOND: 3,
    CLUB: 4,
};

// Rank enum
const Rank = {
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
};

// HandRankingCategory enum
const HandRankingCategory = {
    // 5 ranks, >1 suits
    HIGH_CARD: 0,
    // 4 ranks, >1 suits
    PAIR: 1,
    // 3 ranks, >1 suits, 2 equals
    TWO_PAIRS: 2,
    // 3 ranks, >1 suits, 3 equals
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
};

// HandRanking class
class HandRanking {
    constructor(category,
            leadingRank = Rank.NONE,
            secondRank = Rank.NONE,
            thirdRank = Rank.NONE,
            forthRank = Rank.NONE,
            fifthRank = Rank.NONE) {

        this.category = category;
        this.ranks = [leadingRank,secondRank,thirdRank,forthRank,fifthRank];
    }

    // A comparable value
    toInteger() {
        return this.category * 0xF00000
        + this.getRankWeight(this.ranks[0]) * 0x010000
        + this.getRankWeight(this.ranks[1]) * 0x001000
        + this.getRankWeight(this.ranks[2]) * 0x000100
        + this.getRankWeight(this.ranks[3]) * 0x000010
        + this.getRankWeight(this.ranks[4]);
    }

    // The weight of a single card
    getRankWeight(rank) {
        if (rank == Rank.ACE) {
            return rank+13;
        }
        return rank;
    }

    // To human readable string (maybe move to a special class)
    toString() {
        switch(this.category) {
            case HandRankingCategory.HIGH_CARD:
                return "High Card";
            case HandRankingCategory.PAIR:
                return "Pairs";
            case HandRankingCategory.TWO_PAIRS:
                return "Tow Pairs";
            case HandRankingCategory.THREE_OF_A_KIND:
                return "Three of a Kind";
            case HandRankingCategory.STRAIGHT:
                return "Straight";
            case HandRankingCategory.FLUSH:
                return "Flush";
            case HandRankingCategory.FULL_HOUSE:
                return "Full House";
            case HandRankingCategory.FOUR_OF_A_KIND:
                return "Four of a Kind";
            case HandRankingCategory.STRAIGHT_FLUSH:
                return "Straight Flush";
            case HandRankingCategory.ROYAL_FLUSH:
                return "Royal Flush";
        }
    }
}

// The static class to analyze hand cards.
// Need refactoring
class HandRankingAnalyzer {
    // Find non-zero counts
    static getNumberOfNonZero(counts) {
        var numberOfNonZero = 0;

        for (var count of counts) {
            if (count > 0) {
                numberOfNonZero ++;
            }
        }

        return numberOfNonZero;
    }

    // Find max count
    static getMaxCount(counts) {
        var maxCount = 0;

        for (var count of counts) {
            if (count > maxCount) {
                maxCount = count;
            }
        }

        return maxCount;
    }

    // Find max rank combo, combo means things like '2,3,4' (3 combo) or '10,J,Q,K' (4 combo)
    // K-A can be combe, A-2 can be combo, but 'K,A,2' is not 3 combo
    static getMaxRankCombo(suitsCount) {
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

        // find any K-A combination
        if (suitsCount[0] > 0) {
            combo ++;
            if (combo > maxCombo) {
                maxCombo = combo;
            }
        }

        return maxCombo;
    }

    // generate a specific handranking 
    static generateFourOfAKind(ranksCount) {
        var leadingRank = Rank.NONE;
        var secondRank = Rank.NONE;
        for (var i=0; i<13; i++) {
            if (ranksCount[i] == 4) {
                leadingRank = i + 1;
            }
            
            if (ranksCount[i] == 1) {
                secondRank = i + 1;
            }
        }

        return new HandRanking(HandRankingCategory.FOUR_OF_A_KIND, leadingRank, secondRank);
    }

    // generate a specific handranking 
    static generateHighCard(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        var index = 0;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] != 0) {
                cards[index] = i%13 + 1;
                index++;
            }
        }

        return new HandRanking(HandRankingCategory.HIGH_CARD, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }

    // generate a specific handranking 
    static generatePair(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        var index = 1;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 1) {
                cards[index] = i%13 + 1;
                index++;
            }
            if (ranksCount[i%13] == 2) {
                cards[0] = i%13 + 1;
            }
        }

        return new HandRanking(HandRankingCategory.PAIR, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }

    // generate a specific handranking 
    static generateTwoPairs(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        var index1 = 2;
        var index2 = 0;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 1) {
                cards[index1] = i%13 + 1;
                index1++;
            }
            if (ranksCount[i%13] == 2) {
                cards[index2] = i%13 + 1;
                index2++;
            }
        }

        return new HandRanking(HandRankingCategory.TWO_PAIRS, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }

    // generate a specific handranking 
    static generateFlush(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        var index = 0;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] != 0) {
                cards[index] = i%13 + 1;
                index++;
            }
        }

        return new HandRanking(HandRankingCategory.FLUSH, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }

    // generate a specific handranking 
    static generateFullHouse(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 3) {
                cards[0] = i%13 + 1;
            }
            if (ranksCount[i%13] == 2) {
                cards[1] = i%13 + 1;
            }
        }

        return new HandRanking(HandRankingCategory.FULL_HOUSE, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }

    // generate a specific handranking 
    static generateThreeOfAKind(ranksCount) {
        var cards = [Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE,Rank.NONE];
        var secondRank = Rank.NONE;
        var index = 1;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 1) {
                cards[index] = i%13 + 1;
                index++;
            }
            if (ranksCount[i%13] == 3) {
                cards[0] = i%13 + 1;
            }
        }

        return new HandRanking(HandRankingCategory.THREE_OF_A_KIND, cards[0], cards[1], cards[2], cards[3], cards[4]);
    }
    
    // generate a specific handranking 
    static generateStraight(ranksCount) {
        var leadingRank = Rank.NONE;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 1) {
                leadingRank = i%13 + 1;
                break;
            }
        }

        return new HandRanking(HandRankingCategory.STRAIGHT, leadingRank, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE);
    }
    
    // generate a specific handranking 
    static generateStraightFlush(ranksCount) {
        var leadingRank = Rank.NONE;
        for (var i=13; i>0; i--) {
            if (ranksCount[i%13] == 1) {
                leadingRank = i%13 + 1;
                break;
            }
        }

        return new HandRanking(HandRankingCategory.STRAIGHT_FLUSH, leadingRank, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE);
    }

    // generate a handranking from 5 cards
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
        var maxRankCombo = this.getMaxRankCombo(ranksCount);

        if (numberOfSuits == 1 && numberOfRanks == 5 && maxRankCombo == 5) {
            // STRAIGHT_FLUSH or ROYAL_FLUSH
            if (cards[0].suit == Suit.DIAMOND && ranksCount[0] == 1) {
                return new HandRanking(HandRankingCategory.ROYAL_FLUSH)
            } else {
                return this.generateStraightFlush(ranksCount);
            }
        } else if (numberOfRanks == 2) {
            if (maxRankCount == 4) {
                // FOUR_OF_A_KIND
                return this.generateFourOfAKind(ranksCount);
            } else {
                // FULL_HOUSE
                return this.generateFullHouse(ranksCount);
            }
        } else if (numberOfSuits == 1) {
            // FLUSH
            return this.generateFlush(ranksCount);
        } else if (maxRankCombo == 5) {
            // STRAIGHT
            return this.generateStraight(ranksCount);
        } else if (numberOfRanks == 3) {
            if (maxRankCount == 3) {
                // THREE_OF_A_KIND
                return this.generateThreeOfAKind(ranksCount);
            } else {
                // TWO_PAIRS
                return this.generateTwoPairs(ranksCount);
            }
        } else if (numberOfRanks == 4) {
            // PAIRS
            return this.generatePair(ranksCount);
        } else {
            // HIGH_CARD
            return this.generateHighCard(ranksCount);
        }
    }

    // find best 5 cards from >5 cards
    static selectBestCards(cards)
    {
        var result = {results:[]};
        this.selectCards(cards, 5, [], result);

        var maxRankValue = 0;
        var maxHandRanking = {};
        var maxRankCards = [];

        for (var cards of result.results) {
            var handRanking = this.getRankingFromCards(cards);
            var cardValue = handRanking.toInteger();
            if (cardValue > maxRankValue) {
                maxRankCards = cards;
                maxRankValue = cardValue;
                maxHandRanking = handRanking;
            }
        }

        return maxRankCards;
    }
    
    // A resursive help function for selectBestCards.
    // This function will pick {remain} more cards from {cards}, and put them in {result}, the selected cards will be put in {selected}. 
    static selectCards(cards, remain, selected, result)
    {
        if (remain == 0) {
            result.results.push(selected);
            return;
        }
        if (cards.length == 0) {
            return;
        }

        var newSelected = selected.slice();
        newSelected.push(cards[0]);
        this.selectCards(cards.slice(1), remain-1, newSelected, result)
        this.selectCards(cards.slice(1), remain, selected, result)
    }
}

// GameStep enum
const GameStep = {
    NONE: 0,
    ANTE: 1,
    PREFLOP: 2,
    FLOP: 3,
    TURN: 4,
    RIVER: 5,
    SHOWDOWN: 6,
    END: 7
};

// BetType enum
const BetType = {
    NONE: 0,
    RAISE: 1,
    FOLLOW: 2, // Check/Call
    QUIT: 3
};


class GameStepHelper {
    static moveToNextStep(engine, players) {
        let step = engine.step;
        // first is holder, 2 player at least, first is holder
        switch(step) {
            case GameStep.NONE:
                // PREPARE
                // TODO
                return GameStep.ANTE;
            case GameStep.ANTE:
                // BLIND BET
                this.blindBet(players[1], 1);
                this.blindBet(players[2 % players.length], 2);
                return GameStep.PREFLOP;
            case GameStep.PREFLOP:
                this.givePlayerCards(engine, players);
                this.givePlayerCards(engine, players);
                // PREFLOP BET
                this.runBets(engine, players);
                return GameStep.FLOP;
            case GameStep.FLOP:
                this.showSharedCard(engine);
                this.showSharedCard(engine);
                this.showSharedCard(engine);
                // FLOP BET
                this.runBets(engine, players);
                return GameStep.TURN;
            case GameStep.TURN:
                this.showSharedCard(engine);
                // TURN BET
                this.runBets(engine, players);
                return GameStep.RIVER;
            case GameStep.RIVER:
                this.showSharedCard(engine);
                // RIVER BET
                this.runBets(engine, players);
                return GameStep.SHOWDOWN;
            case GameStep.SHOWDOWN:
                // PAY
                return GameStep.END;
        }
    }

    static givePlayerCards(engine, players) {
        for (let player of players) {
            let card = engine.deck.pop();
            player.handcards.push(card);
        }
    }

    static blindBet(player, numberOfBid) {
        return player.doBlindBet(numberOfBid);
    }

    static waitForBet(engine, player) {
        let bet = player.doBet(engine.highbets);

        if (engine.highbets < player.bets) {
            engine.highbets = player.bets;
        }

        return bet;
    }

    static showSharedCard(engine) {
        let card = engine.deck.pop();
        engine.sharedCards.push(card);
    }

    static runBets(engine, players) {
        while (true) {
            let allBided = false;
            let comboNoRaise = 0;
            let endBid = false;
            for (let player of players) {
                let bid = this.waitForBet(engine, player);
                if (bid.type == BetType.RAISE) {
                    comboNoRaise = 0;
                } else {
                    // quit or follow
                    comboNoRaise ++;
                }
                if ((comboNoRaise >= players.length - 1) && allBided) {
                    endBid = true;
                    break;
                }

                allBided = true;
            }
            
            if (endBid) {
                break;
            }
        }
    }
}


class Bet {
    constructor(type, size) {
        this.type = type;
        this.size = size;
    }
}


class Player {
    constructor(name) {
        this.id = Player.ids;
        Player.ids++;

        this.money = 0;
        if (name == undefined) {
            name = "Player " + this.id;
        }
        this.bets = 0;

        this.name = name;
        this.handcards = [];
    }

    doBet(targetNum) {
        let num = this.makeBet(targetNum);
        return new Bet(BetType.FOLLOW, num);
    }

    doBlindBet(num) {
        this.makeBet(num)

        return new Bet(BetType.FOLLOW, num);
    }
    
    makeBet(targetNum) {
        let num = targetNum - this.bets;

        this.money -= num;
        this.bets += num;

        return num;
    }
}

Player.ids = 0;

// The engine class, the entrance of most features.
class PokerEngine {
    constructor() {
        this.deck = PokerEngine.createDeck ();
        this.step = GameStep.NONE;
        this.sharedCards = [];
        this.pot = 0;
        this.highbets = 0;
    }

    static createDeck () {
        var deck = [];
        for (var rank=1; rank <= 13; rank++) {
            for (var suit=1; suit<= 4; suit++) {
                var c = new Card(suit, rank);
                deck.push(c);
            }
        }

        return deck;
    }

    static getRankingFromCards(cards) {
        return HandRankingAnalyzer.getRankingFromCards(cards);
    }

    static selectBestCards(cards) {
        return HandRankingAnalyzer.selectBestCards(cards);
    }

    shuffleDeck() {
        let length = this.deck.length;
        while (length > 0) {
            let index = Math.floor(Math.random() * length);
            length--;
            let temp = this.deck[length];
            this.deck[length] = this.deck[index];
            this.deck[index] = temp;
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports = function ()
    {
        this.PokerEngine = PokerEngine;
        this.Suit = Suit;
        this.Card = Card;
        this.Rank = Rank;
        this.HandRanking = HandRanking;
        this.HandRankingCategory = HandRankingCategory;
        this.Player = Player;
        this.GameStepHelper = GameStepHelper;
        this.GameStep = GameStep;
    };
}
