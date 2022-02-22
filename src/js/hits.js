import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, productCardClickEvents, detectMobile} from "./common.js";
import {submitForm} from "./request.js";

const hitsSliderContainer = document.querySelector(".js-hits-slider");
const isMobile = detectMobile();
let hitsSlider = null;

//remove dummy data func generator

const dummyDataGenerator = (num) => {
    const array = new Array(num).fill(0);
    return array.map((el, index) => {
        return {
            link: "https://test.ru",
            title: "test",
            description: "test",
            volume: 200,
            comments: 20,
            image: `https://picsum.photos/id/${index + 90}/200/`,
            type: "new",
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

const getSlide = (content) => {
    return `<div data-href="${content.link}" data-type="${content.type}" data-product-id="1"  class="js-product-card product-card _hit">
        <img class="product-card__img" src="${content.image}" alt="product">
        <h3 class="product-card__title">
            ${content.title}
        </h3>
        <p class="product-card__description">
            ${content.description}
        </p>
        <p class="product-card__volume">
            ${content.volume} мл
        </p>
        <div class="product-card__stats">
            <div data-stars="4" class="product-card__stars"></div>
            <a href="${content.link}#comments" class="js-product-comments product-card__comments">${getNoun(content.comments, "отзыв",
        "отзыва", "отзывов")}</a>
        </div>
        <button class="js-buy-btn product-card__btn main-btn _green">
            Купить
        </button>
    </div>`
}

productCardClickEvents(hitsSliderContainer);

submitForm('get', "/api/hits").then(res => res.json()).then(data => {
    hitsSlider = createHitsSlider(hitsSliderContainer, data)
}).catch(e => {
    console.error(e)
    //удалить ниже тестовые данные
    hitsSlider = createHitsSlider(hitsSliderContainer, dummyData);
});

