
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

    handleClick: () => {
        console.log("clicked!")
    },

    forEach() {
        this.keys.forEach(key=> {
            const buttonElement = document.createElement('button')
            buttonElement.textContent = key
            buttonElement.setAttribute('id', key)
            buttonElement.addEventListener('click', this.handleClick)
            this.keyboard.append(buttonElement)
        })
    }
}

startingUI.forEach()

