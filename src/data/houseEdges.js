export const houseEdges = [
  {
    name: 'Baccarat',
    types: [
      { name: 'Banker', edge: 1.06 },
      { name: 'Player', edge: 1.24 },
    ],
    intro:
      "Player has two bets, to bet on player or banker! Goal is for players' cards to be as close to 9 as possible. Cards 2-9 have face-value, while cards 10-King have 0-value, and ace has a value of 1. Two cards are dealt face-up to the players and the banker. Whichever side is closest to 9, those respective bets will win. If player has value of 5 or less, they will hit. Otherwise, the banker will hit on 5 or less value if player stands. Player bet has double payout, while banker bet has 95% payout.",
    rules:
      "Players make bet on either player or banker \n Dealer deals two cards for the banker side and two cards for the player side all facing up \n Cards are assessed and if above 5 on any side closest to 9 wins \n If both sides' cards are 5 or below, they keep hitting until above 5 \n Winner is side closest to 9",
  },
  {
    name: 'Big Six',
    types: [
      { name: '$1 Bet', edge: 11.11 },
      { name: '$2 Bet', edge: 16.67 },
      { name: '$5 Bet', edge: 22.22 },
      { name: '$10 Bet', edge: 18.52 },
      { name: '$20 Bet', edge: 22.22 },
      { name: 'Joker/Logo', edge: 24.07 },
    ],
    intro:
      'Player has six possible bets, as shown below. The player is trying to predict a wheel-spin. The wheel has 52 segments, and each segment contains one bet only. The higher-paying bets/segments are more rare to land on, while the lower paying bets/segments are common to land on as there is a higher frequency of them. The wheel will spin and target one segment. The player with the correct bet wins the respective payout.',
    rules:
      'There are 24 segments out of 52 that correspond to $1 bet and pays 1 to 1 (44.44% probability & 11.11% HE) \n There are 15 segments out of 52 that correspond to $2 bet and pays 2 to 1 (27.78% probability & 16.67% HE) \n There are 7 segments out of 52 that correspond to $5 bet and pays 5 to 1 (12.96% probability & 22.22% HE) \n There are 4 segments out of 52 that correspond to $10 bet and pays 10 to 1 (7.41% probability & 18.52% HE) \n There are 2 segments out of 52 that correspond to $20 bet and pays 20 to 1 (3.70% probability & 22.22% HE) \n There is 1 segment out of 52 that corresponds to $40 bet and pays 40 to 1 (1.85% probability & 24.07% HE) \n',
  },
  {
    name: 'Bonus Six',
    types: [
      { name: 'No Insurance', edge: 10.42 },
      { name: 'Insurance', edge: 23.83 },
    ],
    intro:
      'Bonus Six is a poker based game card game, popular in the casinos of Black Hawk, Colorado. As in five-card stud the player gets cards gradually and must keep raising to stay in or fold. The twist in this game is that if the player buys insurance initially he has the option to buy a sixth card if he needs one. Following are the specifics.',
    rules:
      'The game is played with a single deck of cards, which is shuffled after every hand. \n The player begins by placing an ante bet. The player may also buy insurance at the cost of half the ante bet. The cost of the insurance policy is never returned. \n Each player receives two cards face down and one community card dealt face up. All players may use the community card as part of their hand. \n After looking at his cards the player must decide to either bet or fold. If the player folds he forfeits his ante. If player bets he must add to his wager an amount equal to the ante. \n All players who raised receive a fourth card. \nAgain, all players still in must either bet or fold. If the player folds he loses both his ante and previous bet. If player bets he must add to wager an amount equal to the ante. \n All players still in receive a fifth card. \n If the player initially purchases insurance and does not have a paying hand he has the option to buy a sixth card. The cost of the card is equal to the ante. \n If the player buys the sixth card he may make the best five-card hand among his six cards. The fee for the sixth card is never returned.',
  },
  {
    name: 'Blackjack',
    types: [{ name: 'Liberal Vegas intro', edge: 0.28 }],
    intro:
      "Player has two bets, to bet on player or banker! Goal is for players' cards to be as close to 9 as possible. Cards 2-9 have face-value, while cards 10-King have 0-value, and ace has a value of 1. Two cards are dealt face-up to the players and the banker. Whichever side is closest to 9, those respective bets will win. If player has value of 5 or less, they will hit. Otherwise, the banker will hit on 5 or less value if player stands. Player bet has double payout, while banker bet has 95% payout.",
    rules:
      "Players place their bets \n Dealer deals cards one per person starting with dealer until each person has two cards \n Everyone's cards are face up except for dealer that has one face up other face down \n Players can double down their bet to hit only once if they are confident next hit will beat dealer \n Players can split matching value cards with a matching bet \n Players can hit until they are satisfied or go over 21 (bust) \n Dealer reveals his/her cards and hits until 17 or higher \n Anyone who beats dealer receives 1 to 1 payout unless player has blackjack which payout can be double or 1.5 to 1.",
  },
  {
    name: 'Caribbean Stud Poker',
    types: [{ name: 'Default', edge: 5.22 }],
    intro:
      'Caribbean Stud Poker is based on Five-Card Stud Poker. It is played with a single deck of cards, with the Player playing against the house rather than against each other. The Player also has the opportunity to wager on the Progressive Jackpot which entitles them to qualify for the major jackpot..',
    rules:
      "Player makes an ante wager plus an optional $1 progressive side bet \n Each player and the dealer get five cards each. All cards are dealt face down, except one dealer card is exposed. The player may examine his own cards but sharing of information is not allowed. \n Player must fold or raise. \n If player folds he forfeits his cards, ante bet, and side bet (if made) \n If player raises then he must make a raise wager exactly equal to twice the ante \n The dealer will turn over his other four cards \n The dealer must have an ace and a king or higher to qualify. In other words, the lowest qualifying hand would be ace, king, 4, 3, 2 and the highest non-qualifying hand would be ace, queen, jack, 10, 9. If the dealer does not qualify the player will win even money on his ante wager and the raise will push. \n If the dealer qualifies and beats the player, both ante and raise will lose. \n If the dealer qualifies and loses to the player, then the ante will pay even money and the raise according to the posted pay table. \n If the player and dealer tie, both ante and raise will push. \n The progressive side bet will be entirely based on the poker value of the player's hand. Various pay tables are available.",
  },
  {
    name: 'Casino War',
    types: [
      { name: 'War On Ties', edge: 2.88 },
      { name: 'Surrender On Ties', edge: 3.7 },
      { name: 'Default', edge: 0.5 },
    ],
    intro:
      "Player has two bets, to bet on player or banker! Goal is for players' cards to be as close to 9 as possible. Cards 2-9 have face-value, while cards 10-King have 0-value, and ace has a value of 1. Two cards are dealt face-up to the players and the banker. Whichever side is closest to 9, those respective bets will win. If player has value of 5 or less, they will hit. Otherwise, the banker will hit on 5 or less value if player stands. Player bet has double payout, while banker bet has 95% payout.",
    rules: '',
  },
  {
    name: 'Catch A Wave',
    types: [{ name: 'Default', edge: 0.5 }],
    intro:
      "The game is played with eight standard decks of cards. Cards are ranked according to poker value, except aces are always high. The suit does not matter. Play starts with the player making a wager. Next the player and dealer each receive one card, both face up. At this point the player must either hit or stand. If the player hits he must indicate whether the next card will be higher or lower than the first one. If the player hits and his call is incorrect or if the cards are equal in value, then the player loses and his wager and cards are immediately collected. If the player's call is correct he again has the option to stand or hit. If he hits he again must indicate if the next card will be higher or lower than the last one. This process repeats until the player either makes an incorrect call, stands, or successfully hits six times. If the player does hit correctly six times (catching a wave) then he automatically is paid 6 to 1 on his original wager.",
    rules:
      'Player places down a wager \n Player and dealer both receive one card each face up \n Player chooses to hit or stand - if they hit, they have to guess high or low on their next card \n Once all players hit, dealer hits or stands according to predetermined rules \n If dealer loses, all active hands receive a 1 to 1 payout. \n If 6 correct hits in a row for any player, that player receives 6 to 1 payout.',
  },
  {
    name: 'Crazy 4 Poker',
    types: [{ name: 'Ante', edge: 3.42 }],
    intro:
      'Crazy 4 Poker is a casino table game played against the dealer. It is similar to Three Card Poker but, as the name says, is based on four cards. The player and the dealer each receive five cards to make their best four-card poker hand. A four card straight is a straight, a four card flush is a flush, and a four card straight flush is a straight flush.',
    rules:
      'Players place their wagers \n Dealer gives 5 cards to each player \n Player decides 4 card hand that has highest chance of winning the pot \n Player wins if dealer hand does not qualify or beats qualifying dealer hand \n Dealer hand qualifies if king-high or better ',
  },
  {
    name: 'Double Down Stud',
    types: [{ name: 'Default', edge: 2.67 }],
    intro:
      'In the case of Double Down Stud video poker, a lot of that guesswork is taken away from you. You have just one decision to make when you play each hand, and that’s whether or not you’re going to double your bet. Since that decision is made when there is just one more card to be seen in your hand, the possible outcomes are greatly reduced from what you would find playing basic video poker.',
    rules:
      'Players make an initial wager. \n The dealer gives each player one card face up and deals four community cards, three up and one down. Each hand is dealt from a freshly shuffled single deck. \n Each player has the option to double their bet or not. \n The dealer turns over the down card. \n Winning hands pay according to the payoff table. \n Any pat hand of a pair of 6+; Four to a flush, straight flush, or royal flush; four to any outside straight; unsuited JQKA',
  },
  {
    name: 'Slot Machines',
    types: [
      { name: '3-Reel', edge: '6-12%' },
      { name: '5-Reel', edge: '6-12%' },
    ],
    intro:
      'Player plays on a machine that spins a set of reels. Players hope is to match certain symbols in a row, diagonal, or other orientation so that they may recieve a payout according to their bet. If no matching symbols, player loses bet.',
    rules:
      'Player makes a bet and presses a button or lever to spin the reels \n Reels spin for a moment and stop to reveal the pattern of symbols landed on \n Computer analyzes orientation of symbols and pays player accordingly',
  },
  {
    name: 'Keno',
    types: [{ name: 'Default', edge: 29 }],
    intro:
      'Player has up to 80 numbers ranged 1-80 and can pick up to 12 unique numbers in that range. Players can also pick as little as 1 number, but goal for player is to match as many of their numbers to the winning numbers. The winning numbers are 20 unique numbers from that same range. If a player picks 23 as their only number (1-spot game), and the winning numbers are 1, 67, 34, ... 23, then the player wins the respective payout amount - in this case 2.5 to 1',
    rules:
      'Player decides how many numbers they want to play (1-12) and picks their numbers \n Players then decide how many draws/games they want to play with those numbers; next-game, next two games, next twenty games, etc. \n Laslty, user places bet per draw/game; player bets $1 per draw and plays 10 draws so total bet is $10. \n Player waits till game is over and checks the winning 20 numbers with his/hers.',
  },
  {
    name: 'Powerball',
    types: [{ name: 'Default', edge: 'Too High' }],
    intro:
      'Powerball is simply a game of trying to match all 6 of your numbers with the 6 winning numbers. Players have to pick 5 non-powerball numbers and 1 powerball number. Payout is determined by matching numbers and match type (powerball vs non).',
    rules:
      'Player picks 5 unique non-powerball numbers in range from 1-69, then pick 1 powerball number in range from 1-29. \n Player then confirms the bet amount and how many draws/games they want their numbers valid for \n Winning numbers are announced and player checks his/her numbers with the winners',
  },
  {
    name: 'Scratch Tickets',
    types: [{ name: 'Default', edge: '20-30%' }],
    intro:
      'Player buys a ticket of certain value and scratches off the material that is hiding whether or not that ticket is a winner',
    rules:
      'Player buys a ticket of certain value; usually $1, $2, $5, %10, $20, $30, or $50 \n Player then scratches the ticket to make the hidden content shown \n If player matches player numbers to winning numbers, player wins payout that is shown directly below their matching number \n Players can also scratch off unique symbols that can win them 10x, 20x, 50x, 100x, and more the payout shown below the winning symbol.',
  },
  {
    name: 'Roulette',
    types: [
      { name: 'Single Zero', edge: 2.7 },
      { name: 'Double Zero', edge: 5.26 },
    ],
    intro:
      'Players are provided spots to bet on. Those spots pertain to the segments in the Roulette wheel, each segment containing a unique number in range from 1-36, 0, or 00. Each segment is also colored black or red. Players goal is to predict where the winning ball will land once the roulette spins',
    rules:
      'Player makes a bet according to where they believe the ball will land; they can bet even/odd number, black/red colored segment, specific number like 23, a group of numbers, a column of numbers, etc \n Dealer places a solid ball inside the Roulette wheel and spins the wheel \n Winners are paid according to their bet type where betting on a single number pays the highest at 1 to 36',
  },
];
