var test = require ('./test.js');
let Test = test.Test;

var prototype = require ('../prototype.js');
let CardUtils = prototype.CardUtils;
let HandUtils = prototype.HandUtils;
let GameEngine = prototype.GameEngine;
let Suit = prototype.Suit;
let Card = prototype.Card;
let Rank = prototype.Rank;
let Hand = prototype.Hand;
let HandRank = prototype.HandRank;
let Player = prototype.Player;
let GameStep = prototype.GameStep;


// test case
new Test("Card Id Test", function() {
    for (let rank=1; rank <= 13; rank++) {
        for (let suit=1; suit<= 4; suit++) {
            let c1 = new Card(suit, rank);
            let c2 = CardUtils.getCardFromId(c1.id);
            this.areEqual(c1.id, c2.id)
        }
    }
});

// test case
new Test("GameEngine Create Deck Test", function() {
    var deck = GameEngine.createDeck();
    this.areEqual(deck.length, 52);
});

// test case
new Test("GameEngine.getRankingFromCards FOUR_OF_A_KIND Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.CLUB, Rank.JACK),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.HEART, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.FOUR_OF_A_KIND)
});

// test case
new Test("GameEngine.getRankingFromCards HIGH_CARD Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.HIGH_CARD)
});

// test case
new Test("GameEngine.getRankingFromCards PAIR Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.PAIR)
});

// test case
new Test("GameEngine.getRankingFromCards TWO_PAIRS Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.TWO_PAIRS)
});

// test case
new Test("GameEngine.getRankingFromCards ROYAL_FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.ROYAL_FLUSH)
});

// test case
new Test("GameEngine.selectBestCards TWO_PAIRS Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.TWO_PAIRS);
    this.areEqual(hand.ranks, [Rank.RANK8, Rank.RANK2, Rank.ACE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("GameEngine.selectBestCards FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.FLUSH);
    this.areEqual(hand.ranks, [Rank.ACE, Rank.QUEEN, Rank.RANK10, Rank.RANK8, Rank.RANK2]);
});

// test case
new Test("GameEngine.selectBestCards FULL_HOUSE Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.FULL_HOUSE);
    this.areEqual(hand.ranks, [Rank.RANK8, Rank.RANK2, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("GameEngine.selectBestCards STRAIGHT Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK10),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.HEART, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.STRAIGHT);
    this.areEqual(hand.ranks, [Rank.ACE, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("GameEngine.selectBestCards FLUSH beats STRAIGHT Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.SPADE, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.FLUSH);
    this.areEqual(hand.ranks, [Rank.ACE, Rank.KING, Rank.QUEEN, Rank.RANK10, Rank.RANK8]);
});

// test case
new Test("GameEngine.selectBestCards ROYAL_FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.SPADE, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = GameEngine.selectBestCards(cards);
    var hand = GameEngine.getHandFromCards(cards);
    this.areEqual(hand.handRank, HandRank.ROYAL_FLUSH);
    this.areEqual(hand.ranks, [Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("GameEngine GameSteps Test", function() {
    let players = [new Player(),new Player(),new Player()];
    let game = GameEngine.createGame(players);
    GameEngine.shuffleDeck(game);
    while (game.step != GameStep.END) {
        GameEngine.moveToNextStep(game);
    }

    this.isTrue(game.board.length == 5);

    for(let player of players) {
        this.isTrue(player.hole.length == 2);
        let cards = [];
        cards = cards.concat(player.hole, game.board)
        cards = GameEngine.selectBestCards(cards);
        player.hand = GameEngine.getHandFromCards(cards);
    }

    let biggestRanking = null;
    let winner = null;
    for(let player of players) {
        if (biggestRanking == null) {
            biggestRanking = player.hand;
            winner = player;
        } else if (player.hand.weight > biggestRanking.weight) {
            biggestRanking = player.hand;
            winner = player;
        }
    }
});


