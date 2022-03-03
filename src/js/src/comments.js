import {getNoun} from "./common";

const scoreList = document.querySelector(".js-score-list");
const scoreText = document.querySelector(".js-score-text");
const averageNumContainer = document.querySelector(".js-score-num");
let averageNum = 0;

const setProgress = (container) => {

    const sumOfAllScores = [...container.children].reduce((accumulator, curr, index) => {
        const value = +curr.querySelector(".js-specific-score-amount").innerText;
        averageNum += value * (index + 1);
        return accumulator + value;
    }, 0);

    averageNumContainer.innerText = (averageNum / sumOfAllScores).toFixed(1);

    scoreText.innerText = getNoun(sumOfAllScores, "отзыв",
        "отзыва", "отзывов");

    [...container.children].forEach(el => {
        const amount = +el.querySelector(".js-specific-score-amount").innerText;
        el.querySelector(".js-score-bar").style.width = amount / sumOfAllScores * 100
            + "%";
    })
}

setProgress(scoreList)