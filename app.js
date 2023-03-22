
const wordle = 'SSPER'

const startingUI = {
    tileDisplay: document.querySelector('.tile-container'),
    keyboard: document.querySelector('.key-container'),
    messageDisplay: document.querySelector('.message-container'),

    keys: [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'ENTER',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        '<<'
    ],

    guessRows: [
        ['','','','','',],
        ['','','','','',],
        ['','','','','',],
        ['','','','','',],
        ['','','','','',],
        ['','','','','',]
    ],

    currentRow: 0,
    currentTile: 0,
    isGameOver: false,

    addLetter (letter) {
        if (this.currentTile<5 && this.currentRow < 6) {
            const tile = document.getElementById(`guessRow-${this.currentRow}-tile-${this.currentTile}`)
            tile.textContent = letter
            this.guessRows[this.currentRow][this.currentTile] = letter
            tile.setAttribute('data', letter)
            this.currentTile++
            console.log('guessRows', this.guessRows)
        }

    },

    deleteLetter () {
        if (this.currentTile> 0) {
            this.currentTile--
            const tile = document.getElementById(`guessRow-${this.currentRow}-tile-${this.currentTile}`)
            tile.textContent = ''
            this.guessRows[this.currentRow][this.currentTile] = ''
            tile.setAttribute('data', '')
        }
    },

    checkrow () {
        if(this.currentTile > 4) {
            const guess = this.guessRows[this.currentRow].join('')
            console.log(`guess is ${guess}, wordle is ${wordle}`)
            this.flipTile()
            if (wordle === guess) {
                this.showMessage('Magnificent!')
                this.isGameOver=true
                return
            } else {
                if (this.currentRow>=5) {
                    isGameOver = false
                    this.showMessage('Game Over')
                    return 
                }
                else if (this.currentRow < 5) {
                    this.currentRow++
                    this.currentTile = 0
                }
            }
        }
    },

    showMessage(message) {
        const messageElement = document.createElement('p')
        messageElement.textContent = message
        this.messageDisplay.append(messageElement)
        setTimeout(()=> this.messageDisplay.removeChild(messageElement), 2000)
    },

    addColorToKey (keyLetter, color) {
        const key = document.getElementById(keyLetter)
        key.classList.add(color)
    },

    flipTile () {
        const rowTiles = document.querySelector('#guessRow-'+ this.currentRow).childNodes

        let checkWordle = wordle
        const guess = []

        rowTiles.forEach(tile => {
            guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
        })



        guess.forEach(guess => {
            if (checkWordle.includes(guess.letter)) {
                guess.color = 'yellow-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })

        guess.forEach((guess, index) => {
            if (guess.letter === wordle[index]) {
                guess.color = 'green-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })
        
        rowTiles.forEach((tile, index) => {
              setTimeout(()=> {
                tile.classList.add('flip')
                tile.classList.add(guess[index].color)
                this.addColorToKey(guess[index].letter, guess[index].color)
            }, 500 * index)
        })
        console.log(checkWordle)
    },

    handleClick (key) {
        console.log("clicked!", key)
        if (key === '<<') {
            return this.deleteLetter()
        }
        if (key === 'ENTER') {
            this.checkrow()
            console.log('check row')
            return
        }
        this.addLetter (key)
    },



    forEach() {
        this.keys.forEach(key=> {
            const buttonElement = document.createElement('button')
            buttonElement.textContent = key
            buttonElement.setAttribute('id', key)
            buttonElement.addEventListener('click', () => this.handleClick(key))
            this.keyboard.append(buttonElement)
        })
        this.guessRows.forEach((guessRow, guessRowIndex) => {
            const rowElement = document.createElement('div')
            rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
            guessRow.forEach((guess, guessIndex)=> {
                const tileElement = document.createElement('div')
                tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
                tileElement.classList.add('tile')
                rowElement.append(tileElement)
            })
            this.tileDisplay.append(rowElement)
        })
    }

}


startingUI.forEach()