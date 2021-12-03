'use strict';
/* basic dom manipulation. WEB API != Java script!
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = `🎉 correct number`;
console.log(document.querySelector('.message').textContent);
document.querySelector('.number').textContent='13';
document.querySelector('.score').value=10;
document.querySelector('.guess').value=23;
console.log(document.querySelector('.guess').value);
*/


const errorMsg = `No number ⛔`
const winnerMsg = `🎉 correct number 🎉`
const highMsg = `📈 too high!`
const lowMsg = `📉 too low!`
const lostMsg = `💀 game over 💀`
const originalBackgroundColor = document.querySelector('body').style.backgroundColor;
const originalScore = Number(document.querySelector('.score').textContent);
const originalMsg = document.querySelector('.message').textContent;
const originalNumber = document.querySelector('.number').textContent;
const originalGuess = document.querySelector('.guess').value;
const originalWidth = document.querySelector('.number').style.width;

let score = originalScore;
let highScore = Number(document.querySelector('.highscore').textContent)
const generateSecretNumber = function () {
    return Math.trunc(Math.random() * 20) + 1
}
let secretNumber = generateSecretNumber()

document.querySelector('.score').value = score

const updateMsg = function (msg) {
    document.querySelector('.message').textContent = msg
}
const printScore = function () {
    document.querySelector('.score').textContent = `${score}`
}
const decScore = function () {
    score--
    printScore()
}
const zeroScore = function () {
    score = 0;
    document.querySelector('.score').textContent = `💀`
    document.querySelector('.number').textContent = `💀`
}

const winEffect = function () {
    document.querySelector('body').style.backgroundColor = 'green'
    document.querySelector('.number').style.width = '30rem'
    document.querySelector('.number').textContent = `🎉 ${secretNumber} 🎉`
    if (score > highScore) {
        highScore = score
        document.querySelector('.highscore').textContent = `${highScore}`
    }
}
const lostEffect = function () {
    document.querySelector('body').style.backgroundColor = 'red'
}
const printGuessOnCC = function () {
    const guess = Number(document.querySelector('.guess').value)
    if (score > 1) {
        if (!guess) {
            updateMsg(errorMsg)
        } else if (guess === secretNumber) {
            updateMsg(winnerMsg)
            winEffect()
        } else if (guess > secretNumber) {
            updateMsg(highMsg)
            decScore()
        } else if (guess < secretNumber) {
            updateMsg(lowMsg)
            decScore()
        }
    } else {
        updateMsg(lostMsg)
        zeroScore()
        lostEffect()
    }
}
const reset = function () {
    document.querySelector('body').style.backgroundColor = `${originalBackgroundColor}`
    document.querySelector('.score').textContent = `${originalScore}`
    document.querySelector('.message').textContent = originalMsg
    document.querySelector('.number').textContent = originalNumber
    score = originalScore
    secretNumber = generateSecretNumber()
    document.querySelector('.guess').value = originalGuess
    document.querySelector('.guess').textContent = originalGuess
    document.querySelector('.number').style.width = originalWidth
}
document.querySelector('.check')
    .addEventListener('click', printGuessOnCC)
document.querySelector('.again').addEventListener('click', reset)
