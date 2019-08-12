class Player {
  constructor(name, id, hand, mainContainer, nameContainer,  pointContainer, handContainer) {
    this.name = name
    this.id = id
    this.hand = hand
    this.points = 0
    this.nameContainer = nameContainer
    this.mainContainer = mainContainer
    this.pointContainer = pointContainer
    this.handContainer = handContainer
    this.wins = 0
  }

  hit = () => {
    let topCard = deck.pop()
    this.hand.push(topCard)
  }

  stand = () => {
    this.mainContainer.classList.remove('active')
    this.mainContainer.classList.add('hidden')
  }
}

class Card {
  constructor(rank, suit) {
    this.rank = rank
    this.suit = suit
    this.value = rankValues[this.rank]
    this.suitColor = suitColors[this.suit]
  }
}

const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const rankValues = {
  'A'  : 11,
  '2'  : 2,
  '3'  : 3,
  '4'  : 4,
  '5'  : 5,
  '6'  : 6,
  '7'  : 7,
  '8'  : 8,
  '9'  : 9,
  '10' : 10,
  'J'  : 10,
  'Q'  : 10,
  'K'  : 10
}
const suits = ['♥','♦','♠','♣']
const suitColors = {
  '♥' : 'red',
  '♦' : 'red',
  '♠' : 'black',
  '♣' : 'black'
}

const deck = []
const players = []
let currentPlayer = 0
let currPlayer = players[currentPlayer]

const playerContainer = document.querySelector('#players')
const standBtn = document.querySelector('#stand-btn')
const hitBtn = document.querySelector('#hit-btn')
const startBtn = document.querySelector('#start-btn')

const createDeck = () => {
  ranks.forEach(rank => {
    suits.forEach(suit => {
      deck.push(new Card(rank, suit))
    })
  })
}

const shuffleCards = () => {
  deck.map(() => {  
    let randCardIndex = Math.floor(Math.random() * deck.length)
    let randCardIndex2 = Math.floor(Math.random() * deck.length)
    let temp = deck[randCardIndex]

    deck[randCardIndex] = deck[randCardIndex2]
    deck[randCardIndex2] = temp
  })
}

const dealHand = () => {
  let counter = 0
  while(counter < 2) {
    counter++
    players.map(player => {
      let topCard = deck.pop()
      player.hand.push(topCard)
    })
  }
}

const createPlayers = (num) => {
  for(let i = 1; i <= num; i++) {
    let hand = []
    let mainContainer = document.createElement('div')
    const pointContainer = document.createElement('h3')
    const handContainer = document.createElement('ul')
    const nameContainer = document.createElement('h2')
    let player = new Player(`player ${i}`, i, hand, mainContainer, nameContainer, nameContainer, pointContainer, handContainer)
    players.push(player)
  }
}

const updatePoints = () => {
  players.forEach(player => {
    player.points = 0
    player.hand.forEach(card => {
      player.points += card.value
    })
  })
}

const hitMe = () => {
  players[currentPlayer].hit()
  updatePoints()
  check(players[currentPlayer])
  createUi()    
}

const standRound = () => {
  if (currentPlayer !== players.length-1) {
    players[currentPlayer].stand()
    currentPlayer++
    createUi()
  }
  else {
    endGame()
  }
}

const check = (player) => {
  if(player.points > 21) {
    window.alert(`${player.name} busted!`)
    resetGame()
  }
}

const endGame = () => {
  if (players[0].points > players[1].points > 21) {
    window.alert('Player 1 Wins!')
    player[0].wins++
  }
  else if (players[0].points == players[1].points) {
    window.alert("It's a tie!")
  }
  else {
    window.alert('Player 2 Wins!')
    player[1].wins++
  }
  resetGame()
}

const resetGame = () => {
}

const createUi = () => {
  const currPlayerContainer = players[currentPlayer].mainContainer

  const currPlayerName = players[currentPlayer].nameContainer
  currPlayerName.textContent = `${players[currentPlayer].name}`

  const currPlayerPoints = players[currentPlayer].pointContainer
  currPlayerPoints.textContent = `${players[currentPlayer].points}`

  const currPlayerHand = players[currentPlayer].handContainer
  currPlayerHand.textContent = ''
  currPlayerContainer.textContent = ''
  for(let i = 0; i < players[currentPlayer].hand.length; i++) {
    const cardContainer = document.createElement('div')
    const cardSuitTop = document.createElement('span')
    const cardRank = document.createElement('span')
    const cardSuitBot = document.createElement('span')

    cardContainer.classList.add('card')
    cardSuitTop.id = 'card-suit-top'
    cardSuitTop.classList.add('prop')
    cardSuitTop.textContent = `${players[currentPlayer].hand[i].suit}`

    cardRank.id = 'card-rank'
    cardRank.classList.add('prop')
    cardRank.textContent = `${players[currentPlayer].hand[i].rank}`

    cardSuitBot.id = 'card-suit-bot'
    cardSuitBot.classList.add('prop')
    cardSuitBot.textContent = `${players[currentPlayer].hand[i].suit}`

    cardContainer.appendChild(cardSuitTop)
    cardContainer.appendChild(cardRank)
    cardContainer.appendChild(cardSuitBot)

    currPlayerHand.appendChild(cardContainer)
  }
  

  currPlayerContainer.appendChild(currPlayerName)
  currPlayerContainer.appendChild(currPlayerPoints)
  currPlayerContainer.appendChild(currPlayerHand)
  playerContainer.appendChild(currPlayerContainer)
}

const startGame = () => {
  createDeck()
  shuffleCards()
  createPlayers(2)
  dealHand()
  updatePoints()
  createUi()
  // console.log(players)
}