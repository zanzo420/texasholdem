require ('./test.js')();
require ('../prototype.js')();

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
    this.areEqual(handranking.category, HandRankingCategory.FOUR_OF_A_KIND)
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
    this.areEqual(handranking.category, HandRankingCategory.HIGH_CARD)
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
    this.areEqual(handranking.category, HandRankingCategory.PAIR)
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
    this.areEqual(handranking.category, HandRankingCategory.TWO_PAIRS)
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
    this.areEqual(handranking.category, HandRankingCategory.ROYAL_FLUSH)
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
    this.areEqual(handranking.category, HandRankingCategory.TWO_PAIRS);
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
    this.areEqual(handranking.category, HandRankingCategory.FLUSH);
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
    this.areEqual(handranking.category, HandRankingCategory.FULL_HOUSE);
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
    this.areEqual(handranking.category, HandRankingCategory.STRAIGHT);
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
    this.areEqual(handranking.category, HandRankingCategory.FLUSH);
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
    this.areEqual(handranking.category, HandRankingCategory.ROYAL_FLUSH);
    this.areEqual(handranking.ranks, [Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE, Rank.NONE]);
});

// test case
new Test("PokerEngine GameSteps Test", function() {
    let engine = new PokerEngine();
    let players = [new Player(),new Player(),new Player()];
    GameStepHelper.givePlayerCards(engine, players);
});


function printCards(cards) {
    let cardString = "";
    for (let card of cards) {
        cardString += card.toString();
    }
    console.log(cardString)
}

// test case
new Test("PokerEngine GameSteps Test", function() {
    let engine = new PokerEngine();
    let players = [new Player(),new Player(),new Player()];
    while (engine.step != GameStep.END) {
        engine.step = GameStepHelper.moveToNextStep(engine, players);
    }
    printCards(engine.sharedCards);

    for(let player of players) {
        let cards = [];
        printCards(player.handcards);
        cards = cards.concat(player.handcards, engine.sharedCards)
        player.handranking = PokerEngine.getRankingFromCards(cards);
    }

    let biggestRanking = null;
    let winner = null;
    for(let player of players) {
        if (biggestRanking == null) {
            biggestRanking = player.handranking;
            winner = player;
        } else if (player.handranking.toInteger() > biggestRanking.toInteger()) {
            biggestRanking = player.handranking;
            winner = player;
        }
    }

    console.log(winner);
    console.log(biggestRanking);
});


