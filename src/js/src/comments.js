import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun} from "./common";
import {submitForm} from "./request.js";

const scoreList = document.querySelector(".js-score-list");
const scoreTexts = document.querySelectorAll(".js-score-text");
const averageNumContainer = document.querySelector(".js-score-num");
let averageNum = 0;
let numOfReviews = 0;

//dummy data удалить

const dummyData = [
    {id: 1, stars: "5", title: "review 1", text: "kekeke", likes: "3", author: "Наталия", date: "11.12.2021"},
    {id: 2, stars: "5", title: "review 2", text: "kekeke", likes: "2", author: "Наталия", date: "11.12.2021"},
    {id: 3, stars: "2", title: "review 3", text: "kekeke", likes: "3", author: "Наталия", date: "11.12.2021"},
    {id: 4, stars: "3", title: "review 4", text: "kekeke", likes: "1", author: "Наталия", date: "11.12.2021"},
    {id: 5, stars: "5", title: "review 5", text: "kekeke", likes: "3", author: "Наталия", date: "11.12.2021"}
]

const setProgress = async (container, receivedData) => {

    const data = await formatData(receivedData);

    for (const key in data) {
        const scoreNum = key.substring(1);
        averageNum += data[key] * scoreNum;

        const pattern = `<li class="scores__representation-item">
                            <span class="scores__representation-item-star-num">${scoreNum}</span>
                            <span class="scores__representation-item-score-bar"><div
                                    style="width: ${data[key] / numOfReviews * 100}%" class="scores__representation-item-score-bar-progress"></div></span>
                            <span class="scores__representation-item-amount-num">${data[key]}</span>
                        </li>`
        scoreList.insertAdjacentHTML("afterbegin", pattern);
    }

    averageNumContainer.innerText = (averageNum / numOfReviews).toFixed(1);

    scoreTexts.forEach(el => el.innerText = getNoun(numOfReviews, "отзыв",
        "отзыва", "отзывов"));

}

const formatData = async (data) => {
    const result = {
        "_1": 0,
        "_2": 0,
        "_3": 0,
        "_4": 0,
        "_5": 0
    };
    numOfReviews = data.length;

    data.map(el => {
        result[`_${el.stars}`]++;
    })

    return result;
};

submitForm('get', "/api/hits").then(res => res.json()).then(data => {
    setProgress(scoreList, data);
}).catch(e => {
    console.error(e)
    //удалить ниже тестовые данные
    setProgress(scoreList, dummyData);
});


const reviewSlider = new Swiper(".js-review-slider", {
    slidesPerView: 1,
    followFinger: false,
    effect: 'fade',
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    watchSlidesVisibility: true,
});





