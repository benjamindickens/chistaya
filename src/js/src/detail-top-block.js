import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, productCardClickEvents} from "./common.js";

const detailProductContainer = document.querySelector(".js-detail-product-slider")
const detailProductSlider = new Swiper(detailProductContainer, {
    spaceBetween: 16,
    followFinger: false,
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.js-detail-main-slider-nav.swiper-button-next',
        prevEl: '.js-detail-main-slider-nav.swiper-button-prev',
    },
    breakpoints: {
        667: {
            pagination: false,
            slidesPerView: 5,
            spaceBetween: 9,
        }
    },
})