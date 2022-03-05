import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, hasClass} from "./common";
import {submitForm} from "./request.js";
import {DetailFilters} from "./detail-filters";

const commentsPagination = document.querySelector(".js-comments-pagination");
const scoreList = document.querySelector(".js-score-list");
const scoreTexts = document.querySelectorAll(".js-score-text");
const averageNumContainer = document.querySelector(".js-score-num");
let averageNum = 0;
let numOfReviews = 0;

//dummy data удалить

const dummyData = [
    {
        id: 1,
        reports: "",
        stars: "5",
        title: "rwerwe1",
        text: "kekeke",
        likes: "3",
        author: "Наталия",
        date: "11.12.2021"
    },
    {
        id: 2,
        reports: "",
        stars: "5",
        title: "review 2",
        text: "kekeke",
        likes: "2",
        author: "Наталия",
        date: "11.12.2021"
    },
    {
        id: 1,
        reports: "",
        stars: "5",
        title: "rwerwe1",
        text: "kekeke",
        likes: "3",
        author: "Наталия",
        date: "11.12.2021"
    },
    {
        id: 2,
        reports: "",
        stars: "5",
        title: "review 2",
        text: "kekeke",
        likes: "2",
        author: "Наталия",
        date: "11.12.2021"
    },
    {
        id: 1,
        reports: "",
        stars: "5",
        title: "rwerwe1",
        text: "kekeke",
        likes: "3",
        author: "Наталия",
        date: "11.12.2021"
    },
    {
        id: 2,
        reports: "",
        stars: "5",
        title: "review 2",
        text: "kekeke",
        likes: "2",
        author: "Наталия",
        date: "11.12.2021"
    },
]

const createReviewsSlides = (receivedData) => {
    let page = 1;
    const pages = [];
    let currentPageContent = "";
    receivedData.forEach((data, index) => {
        currentPageContent += getSlide(data);

        if ((index + 1) / page === 4 || receivedData.length === index + 1) {
            pages.push(currentPageContent);
            page++;
            currentPageContent = "";
        }
    })
    return pages;
}

const getSlide = (content) => {
    return `<li class="comments__review">
                        <div data-stars="${content.stars}" class="comments__stars stats__stars"></div>
                        <h2 class="comments__review-title">${content.title}</h2>
                        <p class="comments__review-text">${content.text}</p>
                        <div class="comments__author">${content.author}</div>
                        <div class="comments__date">${content.date}</div>
                        <div class="comments__interface-bar">
                            <div class="comments__likes">
                                <div data-id="${content.id}" class="js-likes comments__likes-container">
                                    <div class="icon"></div>
                                    <div class="num">(${content.likes})</div>
                                </div>
                                <span>Полезный</span>
                            </div>
                            <div data-id="${content.id}" class="js-share comments__share">
                                <div class="icon"></div>
                                <span>Доля</span>
                            </div>
                            <div data-id="${content.id}" class="js-report comments__report">
                                <div class="icon"></div>
                                <span>Отчет</span>
                            </div>
                        </div>
                    </li>`
}

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
// commentsPagination
const createPagination = (slidesLength) => {
    commentsPagination.innerHTML = "";
    for (let index = 0; index < slidesLength; index++) {
        commentsPagination.insertAdjacentHTML('beforeend', `<span class="js-comments-bullet comments__pagination-bullet">${index + 1}</span>`)
    }
}

const pagNavigation = (e) => {
    if (hasClass(e.target, null, "js-comments-bullet")) {
        reviewSlider.slideTo(+e.target.innerText - 1)
    }
}

const reviewSlider = new Swiper(".js-review-slider", {
    slidesPerView: 1,
    followFinger: false,
    effect: 'fade',
    noSwiping: true,
    noSwipingClass: "swiper-slide",
    autoHeight: true,
    fadeEffect: {
        crossFade: true
    },
    watchSlidesVisibility: true,
    virtual: {
        cache: true,
    },
    navigation: {
        nextEl: '.js-comment-nav.swiper-button-next',
        prevEl: '.js-comment-nav.swiper-button-prev',
    },
});

const detailSort = new DetailFilters('#detail-sort', reviewSlider, createReviewsSlides, createPagination);
const detailFilter = new DetailFilters('#detail-filter', reviewSlider, createReviewsSlides, createPagination);

submitForm('get', "/api/hits").then(res => res.json()).then(data => {
    setProgress(scoreList, data).then(() => {
        reviewSlider.virtual.slides = createReviewsSlides(data);
        reviewSlider.virtual.update(true);
        createPagination(reviewSlider.virtual.slides.length)
    });

}).catch(e => {
    console.error(e)
    //удалить ниже тестовые данные
    setProgress(scoreList, dummyData)
});

//удалить тестовую загрузку
reviewSlider.virtual.slides = createReviewsSlides(dummyData);
reviewSlider.virtual.update(true);
createPagination(reviewSlider.virtual.slides.length);

//event pagination

commentsPagination.onclick = pagNavigation;
