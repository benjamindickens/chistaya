import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';

const btnPerGroup = 5;
const bannerSlider = new Swiper(".js-banner-slider", {});

const createNavBtn = (data) => {
    return `<div>${data.title},${data.index}</div>`
}

const createSlides = (navigationData) => {
    const navSlides = [];
    let currentSlide = 0;
    navigationData.forEach(data => {

        if (!navSlides[currentSlide]) {
            navSlides[currentSlide] = [];
        }

        if (navSlides[currentSlide].length <= 5) {
            navSlides[currentSlide].push(createNavBtn(data));
        }

        if (navSlides[currentSlide].length === 5) {
            currentSlide++;
            navSlides[currentSlide] = [];
        }

    })

    return navSlides.map(array => array.join(""));
}

const bannerNavigation = new Swiper(".js-banner-navigation", {
    watchSlidesVisibility: true,
    virtual: {
        cache: true,
        slides: (function () {
            const bannerSliderSlides = bannerSlider.slides;
            const navigationData = bannerSliderSlides.map(slide => {
                return {
                    index: slide.dataset.index,
                    title: slide.dataset.title,
                    description: slide.dataset.description,
                }
            })
            return createSlides(navigationData);
        }()),
    },
});
