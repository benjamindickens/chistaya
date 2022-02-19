import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun} from "./common.js";

const hitsSliderContainer = document.querySelector(".js-hits-slider");

const hitsSlider = new Swiper(hitsSliderContainer, {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 5,
    navigation: {
        nextEl: '.js-hits-nav.swiper-button-next',
        prevEl: '.js-hits-nav.swiper-button-prev',
    },
})

