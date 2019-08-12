class Player {
  constructor(name, id, hand, container, pointBoard, handBoard, winLose) {
    this.name = name
    this.id = id
    this.hand = hand
    this.points = 0
    this.container = container
    this.pointBoard = pointBoard
    this.handBoard = handBoard
    this.winLose = winLose
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

const playerContainer = document.querySelector('#players')
const standBtn = document.querySelector('#stand-btn')
const hitBtn = document.querySelector('#hit-btn')
const startBtn = document.querySelector('#start-btn')

let currentPlayer = 0
let currPlayer = document.querySelector(`#player-1`)

const createDeck = () => {
  ranks.forEach(rank => {
    suits.forEach(suit => {
      deck.push(new Card(rank, suit))
    })
  })
} 

const dealHand = () => {
  for(let i = 0; i < 2; i++) {
    players.forEach(player => {
      let topCard = deck.pop()
      player.hand.push(topCard)
    })
  }
}

const shuffleCards = () => {
  deck.forEach(() => {
    let randCardIndex = Math.floor(Math.random() * deck.length)
    let randCardIndex2 = Math.floor(Math.random() * deck.length)
    let temp = deck[randCardIndex]

    deck[randCardIndex] = deck[randCardIndex2]
    deck[randCardIndex2] = temp
  })
}

const hitMe = () => {
  const cardContainer = document.createElement('div')
  const cardSuitTop = document.createElement('span')
  const cardRank = document.createElement('span')
  const cardSuitBot = document.createElement('span')

  let topCard = deck.pop() 
  players[currentPlayer].hand.push(topCard)
  const lastCardInHand = players[currentPlayer].hand.length - 1 

  const newItem = document.createElement('li')

  cardContainer.classList = 'card'

  cardSuitTop.id = 'card-suit-top'
  cardSuitTop.classList.add('prop')
  cardSuitTop.textContent = `${players[currentPlayer].hand[lastCardInHand].suit}`

  cardRank.id = 'card-rank'
  cardRank.classList.add('prop')
  cardRank.textContent = `${players[currentPlayer].hand[lastCardInHand].rank}`

  cardSuitBot.id = 'card-suit-bot'
  cardSuitBot.classList.add('prop')
  cardSuitBot.textContent = `${players[currentPlayer].hand[lastCardInHand].suit}`

  cardContainer.appendChild(cardSuitTop)
  cardContainer.appendChild(cardRank)
  cardContainer.appendChild(cardSuitBot)
      
  players[currentPlayer].handBoard.appendChild(cardContainer)

  players[currentPlayer].container.appendChild(players[currentPlayer].handBoard)
  playerContainer.appendChild(players[currentPlayer].container)

  updatePoints()
  check()
}

const stand = () => {
  if (currentPlayer != players.length-1) {
    document.getElementById('player-1').classList.remove('active')
    currentPlayer += 1;
    document.getElementById('player-2').classList.add('active')
  }
  else {
    endGame();
  }
}

const endGame = () => {
  if (players[0].points > players[1].points) {
    window.alert('Player 1 Wins!')
    reset()
  }
  else if (players[0].points < players[1].points) {
    window.alert('Player 2 Wins!')
    reset()
  }
  else {
    window.alert('It is a tie!')
    reset()
  }
}

const updatePoints = () => {
  players.forEach(player => {
    player.points = 0

    for(let i = 0; i < player.hand.length; i++) {
      player.points += player.hand[i].value
    }
  
    player.pointBoard.id = 'score-board'
    player.pointBoard.textContent = `Player ${player.id} Points: ${player.points}`

    player.container.appendChild(player.pointBoard)
    playerContainer.appendChild(player.container)
  })
}

const createUI = () => {
  playerContainer.textContent = ''
  players.forEach(player => {
    const playerName = document.createElement('h2')

    for(let i = 0; i < player.hand.length; i++) {
      const handList = document.createElement('li')
      const cardContainer = document.createElement('div')
      const cardSuitTop = document.createElement('span')
      const cardRank = document.createElement('span')
      const cardSuitBot = document.createElement('span')

      cardContainer.classList = 'card'

      cardSuitTop.id = 'card-suit-top'
      cardSuitTop.classList.add('prop')
      cardSuitTop.textContent = `${player.hand[i].suit}`

      cardRank.id = 'card-rank'
      cardRank.classList.add('prop')
      cardRank.textContent = `${player.hand[i].rank}`

      cardSuitBot.id = 'card-suit-bot'
      cardSuitBot.classList.add('prop')
      cardSuitBot.textContent = `${player.hand[i].suit}`

      cardContainer.appendChild(cardSuitTop)
      cardContainer.appendChild(cardRank)
      cardContainer.appendChild(cardSuitBot)
      
      player.handBoard.appendChild(cardContainer)
    }

    updatePoints()
    
    player.container.id =  `player-${player.id}`
    player.container.className = 'player'

    playerName.textContent = `${player.name}`

    player.container.id = `player-${player.id}`

    player.container.appendChild(playerName)
    player.container.appendChild(player.handBoard)

    playerContainer.appendChild(player.container)
  })
}

const reset = () => {
  location.reload()
}

const check = () => {
  if (players[currentPlayer].points > 21) {
    window.alert(`Player ${currentPlayer+ 1} loses!`)
    reset()
  }
}

const createPlayers = () => {
  for(let i = 1; i <= 2; i++) {
    let hand = []
    let container = document.createElement('div')
    const pointBoard = document.createElement('h3')
    const handBoard = document.createElement('ul')
    const cards = document.createElement('li')
    const banner = document.createElement('h1')
    let player = new Player(`player ${i}`, i, hand, container, pointBoard, handBoard, cards, banner)
    players.push(player)
  }
}

const startGame = () => {
  createDeck()
  shuffleCards()
  createPlayers()
  dealHand()
  updatePoints()
  createUI()
  document.getElementById('player-1').classList.add('active')
}