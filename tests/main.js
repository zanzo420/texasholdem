require ('./test.js')();
require ('../prototype.js')();

// test case
new Test("PokerEngine Create Deck Test", function() {
    var deck = PokerEngine.createDeck();
    this.areEqual(deck.length, 52);
});

// test case
new Test("HandRankingCategory.FOUR_OF_A_KIND Test", function() {
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
new Test("HandRankingCategory.HIGH_CARD Test", function() {
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
(function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]

    var hankrank = PokerEngine.getRankingFromCards(cards);
    console.log(hankrank);
    console.log(hankrank.toInteger());
})();

// test case
(function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.RANK2),
        new Card(Suit.CLUB, Rank.RANK2),
        new Card(Suit.SPADE, Rank.RANK8),
        new Card(Suit.HEART, Rank.RANK8),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]

    var hankrank = PokerEngine.getRankingFromCards(cards);
    console.log(hankrank);
    console.log(hankrank.toInteger());
})();


// test case
(function() {
    var cards = [
        new Card(Suit.DIAMOND, Rank.ACE),
        new Card(Suit.DIAMOND, Rank.RANK10),
        new Card(Suit.DIAMOND, Rank.JACK),
        new Card(Suit.DIAMOND, Rank.KING),
        new Card(Suit.DIAMOND, Rank.QUEEN)
    ]

    var hankrank = PokerEngine.getRankingFromCards(cards);
    console.log(hankrank);
    console.log(hankrank.toInteger());
})();


// test case
(function() {
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
    console.log(cards);
})();


// test case
(function() {
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
    console.log(cards);
})();

// test case
(function() {
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
    console.log(cards);
})();

// test case
(function() {
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
    console.log(cards);
})();

// test case
(function() {
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
    console.log(cards);
})();

// test case
(function() {
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
    console.log(cards);
})();

