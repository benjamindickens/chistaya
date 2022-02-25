import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, productCardClickEvents, detectMobile} from "./common.js";

// const isMobile = detectMobile();
const detailProductContainer = document.querySelector(".js-detail-product-slider");
const previewImg = document.querySelector(".js-product-active-img");
const sliderSpeed = 300;

const detailProductSlider = new Swiper(detailProductContainer, {
    spaceBetween: 16,
    followFinger: false,
    slidesPerView: 1,
    speed: 300,
    slideToClickedSlide: true,
    loop: true,
    preventInteractionOnTransition: true,
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
    on: {
        transitionStart() {
            const currentActiveSlide = this.slides[this.realIndex];
            console.log(currentActiveSlide)
            previewImg.classList.add("_transition")

            setTimeout(() => {
                previewImg.querySelector("img").src = currentActiveSlide.querySelector("img").src;
                previewImg.classList.remove("_transition")
            }, sliderSpeed / 2)
        }
    }
})
