import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, hasClass, productCardClickEvents, detectMobile} from "./common.js";

const detailProductContainer = document.querySelector(".js-detail-product-slider");
const descriptionCompositionContainer = document.querySelector(".js-composition-slider");
const tabContainer = document.querySelector(".js-tab");
const descriptionTabButtons = document.querySelectorAll(".js-description-tab-btn")

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
            previewImg.classList.add("_transition")

            setTimeout(() => {
                previewImg.querySelector("img").src = currentActiveSlide.querySelector("img").src;
                previewImg.classList.remove("_transition")
            }, sliderSpeed / 2)
        }
    }
});

const tabSlider = new Swiper(tabContainer, {
    followFinger: false,
    autoHeight: true,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 300,
    slideToClickedSlide: true,
    preventInteractionOnTransition: true,
    navigation: {
        nextEl: '.js-description-tab-btn-next',
        prevEl: '.js-description-tab-btn-prev',
    },
    on: {
        transitionStart() {
            descriptionTabButtons[this.previousIndex].classList.remove("_active");
            descriptionTabButtons[this.realIndex].classList.add("_active");
        }
    }
})

const descriptionCompositionSlider = new Swiper(descriptionCompositionContainer, {
    spaceBetween: 20,
    followFinger: false,
    slidesPerView: 1,
    speed: 300,
    slideToClickedSlide: true,
    preventInteractionOnTransition: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        667: {
            navigation: {
                nextEl: '.js-composition-nav.swiper-button-next',
                prevEl: '.js-composition-nav.swiper-button-prev',
            },
            pagination: false,
            slidesPerView: 3,
            spaceBetween: 50,
        }
    },
})

