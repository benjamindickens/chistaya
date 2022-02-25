import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun, hasClass, productCardClickEvents, detectMobile} from "./common.js";

const detailProductContainer = document.querySelector(".js-detail-product-slider");

const previewImg = document.querySelector(".js-product-active-img");
const sliderSpeed = 300;
const descriptionTabs = document.querySelector(".js-description-tabs");

const tabsLogic = (e) => {
    if (hasClass(e.target, null, "js-description-tab-btn")) {
        let descriptionToClose = null;

        e.target.classList.add("_active");
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.remove("_active");
            descriptionToClose = e.target.nextElementSibling.dataset.open;
        } else {
            e.target.previousElementSibling.classList.remove("_active");
            descriptionToClose = e.target.previousElementSibling.dataset.open;
        }

        const elementToClose = document.querySelector(`[data-detail-description="${descriptionToClose}"]`);
        elementToClose.classList.remove("_active");
        if (elementToClose.nextElementSibling) {
            elementToClose.nextElementSibling.classList.add("_active")
        } else {
            elementToClose.previousElementSibling.classList.add("_active")
        }
    }
}

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

descriptionTabs.addEventListener("click", tabsLogic)