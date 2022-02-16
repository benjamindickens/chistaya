import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {hasClass} from "./common.js";

const btnPerGroup = 5;
const navigationContainer = document.querySelector(".js-banner-navigation")
let bannerNavigation, bannersSlider = null;

const createNavBtn = (data) => {
    return `<button data-index="${data.index}" class="js-banners-nav banners-navigation__btn">
<h3 class="banners-navigation__title">${data.title}</h3>
<p class="banners-navigation__description">${data.description}</p>
</button>`
}

const setActiveBtn = (selector) => {
    (typeof selector === "number" ? navigationContainer.querySelector(`[data-index="${selector}"]`) : selector).classList.add("_active");
}

const createSlides = (navigationData, btnPerGroup) => {
    const navSlides = [];
    let currentSlide = 0;
    navigationData.forEach(data => {

        if (!navSlides[currentSlide]) {
            navSlides[currentSlide] = [];
        }

        if (navSlides[currentSlide].length <= btnPerGroup) {
            navSlides[currentSlide].push(createNavBtn(data));
        }

        if (navSlides[currentSlide].length === btnPerGroup) {
            currentSlide++;
            navSlides[currentSlide] = [];
        }

    })

    return navSlides.map(array => array.join(""));
}

bannersSlider = new Swiper(".js-banner-slider", {
    slidesPerView: 1,
    followFinger: false,
    watchSlidesVisibility: true,
    on: {
        slideChangeTransitionStart() {
            navigationContainer.querySelector("._active").classList.remove("_active");
            setActiveBtn(this.realIndex)
        }
    }
});

bannerNavigation = new Swiper(".js-banner-navigation", {
    followFinger: false,
    watchSlidesVisibility: true,
    virtual: {
        cache: true,
        slides: (function () {
            const bannerSliderSlides = bannersSlider.slides;
            const navigationData = bannerSliderSlides.map(slide => {
                return {
                    index: slide.dataset.index,
                    title: slide.dataset.title,
                    description: slide.dataset.description,
                }
            })
            return createSlides(navigationData, btnPerGroup);
        }()),
    },
    on: {
        init() {
            setActiveBtn(bannersSlider.realIndex);
        },
        slideChangeTransitionStart() {
            const slideToIndex = this.slides[this.realIndex].firstChild.dataset.index;
            bannersSlider.slideTo(slideToIndex);
        }
    },
});


navigationContainer.addEventListener("click", (e) => {
    const currentEL = e.target;

    if (hasClass(currentEL, "js-banners-nav") && !hasClass(currentEL, "_active")) {
        navigationContainer.querySelector("._active").classList.remove("_active");
        setActiveBtn(currentEL);
        bannersSlider.slideTo(currentEL.dataset.index)
    }
})