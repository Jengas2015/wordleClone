
const wordle = 'SUPER'

const startingUI = {
    tileDisplay: document.querySelector('.tile-container'),
    keyboard: document.querySelector('.key-container'),
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

    addLetter (letter) {
        const tile = document.getElementById(`guessRow-${this.currentRow}-tile-${this.currentTile}`)
        tile.textContent = letter
    },

    handleClick (key) {
        console.log("clicked!", key)
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

