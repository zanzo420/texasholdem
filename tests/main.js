var test = require ('./test.js');
let Test = test.Test;

var prototype = require ('../prototype.js');
let CardUtils = prototype.CardUtils;
let HandUtils = prototype.HandUtils;
let PokerEngine = prototype.PokerEngine;
let Suit = prototype.Suit;
let Card = prototype.Card;
let Rank = prototype.Rank;
let Hand = prototype.Hand;
let HandRank = prototype.HandRank;
let Player = prototype.Player;
let GameStepHelper = prototype.GameStepHelper;
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
new Test("PokerEngine Create Deck Test", function() {
    var deck = PokerEngine.createDeck();
    this.areEqual(deck.length, 52);
});

// test case
new Test("PokerEngine.getRankingFromCards FOUR_OF_A_KIND Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.CLUB, Rank.JACK),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.HEART, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.FOUR_OF_A_KIND)
});

// test case
new Test("PokerEngine.getRankingFromCards HIGH_CARD Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.HIGH_CARD)
});

// test case
new Test("PokerEngine.getRankingFromCards PAIR Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.PAIR)
});

// test case
new Test("PokerEngine.getRankingFromCards TWO_PAIRS Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.TWO_PAIRS)
});

// test case
new Test("PokerEngine.getRankingFromCards ROYAL_FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.ROYAL_FLUSH)
});

// test case
new Test("PokerEngine.selectBestCards TWO_PAIRS Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.TWO_PAIRS);
    this.areEqual(handranking.ranks, [Rank.RANK8, Rank.RANK2, Rank.ACE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("PokerEngine.selectBestCards FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.FLUSH);
    this.areEqual(handranking.ranks, [Rank.ACE, Rank.QUEEN, Rank.RANK10, Rank.RANK8, Rank.RANK2]);
});

// test case
new Test("PokerEngine.selectBestCards FULL_HOUSE Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.FULL_HOUSE);
    this.areEqual(handranking.ranks, [Rank.RANK8, Rank.RANK2, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("PokerEngine.selectBestCards STRAIGHT Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK10),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.HEART, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.STRAIGHT);
    this.areEqual(handranking.ranks, [Rank.ACE, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("PokerEngine.selectBestCards FLUSH beats STRAIGHT Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.SPADE, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.SPADE, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.FLUSH);
    this.areEqual(handranking.ranks, [Rank.ACE, Rank.KING, Rank.QUEEN, Rank.RANK10, Rank.RANK8]);
});

// test case
new Test("PokerEngine.selectBestCards ROYAL_FLUSH Test", function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.SPADE, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]
    var cards = PokerEngine.selectBestCards(cards);
    var handranking = PokerEngine.getRankingFromCards(cards);
    this.areEqual(handranking.handRank, HandRank.ROYAL_FLUSH);
    this.areEqual(handranking.ranks, [Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("PokerEngine GameSteps Test", function() {
    let engine = new PokerEngine();
    engine.shuffleDeck();
    let players = [new Player(),new Player(),new Player()];
    while (engine.step != GameStep.END) {
        engine.step = GameStepHelper.moveToNextStep(engine, players);
    }

    this.isTrue(engine.sharedCards.length == 5);

    for(let player of players) {
        this.isTrue(player.handcards.length == 2);
        let cards = [];
        cards = cards.concat(player.handcards, engine.sharedCards)
        cards = PokerEngine.selectBestCards(cards);
        player.handranking = PokerEngine.getRankingFromCards(cards);
    }

    let biggestRanking = null;
    let winner = null;
    for(let player of players) {
        if (biggestRanking == null) {
            biggestRanking = player.handranking;
            winner = player;
        } else if (player.handranking.weight > biggestRanking.weight) {
            biggestRanking = player.handranking;
            winner = player;
        }
    }
});


