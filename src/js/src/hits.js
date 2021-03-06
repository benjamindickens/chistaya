import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, productCardClickEvents, detectMobile} from "./common.js";
import {submitForm} from "./request.js";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const hitsSliderContainer = document.querySelector(".js-hits-slider");
const isMobile = detectMobile();
let hitsSlider = null;

//remove dummy data func generator

const dummyDataGenerator = (num) => {
    const array = new Array(num).fill(0);
    return array.map((el, index) => {
        return {
            id: 1,
            link: "https://test.ru",
            title: "test",
            description: "test",
            volume: 200,
            comments: 20,
            image: `https://picsum.photos/id/${index + 90}/200/`,
            type: ["new", "hit"],
        }
    })
}

const dummyData = dummyDataGenerator(20);

const createHitsSlider = (container, dataOfSlides) => {
    return new Swiper(hitsSliderContainer, {
        spaceBetween: 8,
        slidesPerView: isMobile ? 2 : 5,
        slidesPerGroup: 2,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.js-hits-nav.swiper-button-next',
            prevEl: '.js-hits-nav.swiper-button-prev',
        },
        preloadImages: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        virtual: {
            cache: true,
            slides: (function () {
                const slides = [];
                dataOfSlides.forEach(content => {
                    slides.push(getSlide(content));
                })
                return slides;
            }()),
        },
        breakpoints: {
            667: {
                slidesPerGroup: 1,
                pagination: false,
                spaceBetween: 16,
            }
        },
        on: {
            init() {
                this.slideTo(0, 0)
            }
        }
    })
}

const insertTypeBar = (content) => {
    return content.map(type => `<div data-type="${type}" class="product-card__type-bar"></div>`).join("");
}

const getSlide = (content) => {
    return `<div data-href="${content.link}" data-product-id="${content.id}"
                         class="js-product-card product-card">
                        <div class="product-card__type-section">
                            ${insertTypeBar(content.type)}
                        </div>
                        <img class="product-card__img lazyload" data-src="${content.image}" alt="product">
                        <h3 class="product-card__title">
                            ${content.title}
                        </h3>
                        <p class="product-card__description">
                            ${content.description}
                        </p>
                        <p class="product-card__volume">
                            ${content.volume} ????
                        </p>
                        <div class="product-card__stats stats">
                            <div data-stars="4" class="stats__stars"></div>
                            <a href="${content.link}#comments" class="js-product-comments stats__comments">${getNoun(content.comments,
        "??????????",
        "????????????", "??????????????")}</a>
                        </div>
                        <button data-id="3" class="js-buy-btn product-card__btn main-btn _green">
                        <span>????????????</span>                     
                        </button>
                    </div>`
}

productCardClickEvents(hitsSliderContainer);

submitForm('get', "/api/hits").then(res => res.json()).then(data => {
    hitsSlider = createHitsSlider(hitsSliderContainer, data)
}).catch(e => {
    console.error(e)
    //?????????????? ???????? ???????????????? ????????????
    hitsSlider = createHitsSlider(hitsSliderContainer, dummyData);
});

