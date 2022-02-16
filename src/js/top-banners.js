import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {hasClass} from "./common.js";

const btnPerGroup = 5;
let currentStepWidth = 0;
const navigationContainer = document.querySelector(".js-banners-navigation");
const progressBar = document.querySelector(".js-banners-progress");
let bannerNavigation, bannersSlider = null;

const createNavBtn = (data, btnSlide, progressStep) => {
    return `<button data-step="${progressStep}" data-index="${data.index}" data-slide="${btnSlide}" class="js-banners-nav banners-navigation__btn">
<h3 class="banners-navigation__title">${data.title}</h3>
<p class="banners-navigation__description">${data.description}</p>
</button>`
}

const setActiveBtn = (selector) => {
    (typeof selector === "number" ? navigationContainer.querySelector(`[data-index="${selector}"]`) : selector).classList.add("_active");
}

const setStepToSlides = (slider) => {
    slider.slides.forEach((slide, index) => {
        const step = (index % btnPerGroup) ;
        slide.setAttribute("data-step", step)
    })
}

const setCurrentProgress = () => {
    progressBar.style.width = currentStepWidth * +bannersSlider.slides[bannersSlider.realIndex].dataset.step + "%";
}

const createSlides = (navigationData, btnPerGroup) => {
    const navSlides = [];
    let currentSlide = 0;
    let progressStep = 0;

    navigationData.forEach(data => {

        if (!navSlides[currentSlide]) {
            navSlides[currentSlide] = [];
        }

        if (navSlides[currentSlide].length <= btnPerGroup) {
            navSlides[currentSlide].push(createNavBtn(data, currentSlide, progressStep));
            progressStep++;
        }

        if (navSlides[currentSlide].length === btnPerGroup) {
            currentSlide++;
            progressStep = 0;
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
        init() {
            setStepToSlides(this);
        },
        slideChangeTransitionStart() {
            navigationContainer.querySelector("._active").classList.remove("_active");
            setActiveBtn(this.realIndex)
            const expectedSlide = navigationContainer.querySelector(`[data-index="${this.realIndex}"]`).dataset.slide;
            bannerNavigation.slideTo(expectedSlide);
            setCurrentProgress();
        },
    }
});

bannerNavigation = new Swiper(navigationContainer, {
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
            currentStepWidth = 100 / this.slides[this.realIndex].children.length;
        },
        slideChangeTransitionStart() {
            const slideToIndex = this.slides[this.realIndex].firstChild.dataset.index;
            currentStepWidth = 100 / this.slides[this.realIndex].children.length;
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