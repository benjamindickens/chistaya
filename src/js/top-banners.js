import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';

const btnPerGroup = 5;
const bannerSlider = new Swiper(".js-banner-slider", {});
const bannerSliderSlides = bannerSlider.slides;

const navigationData = bannerSliderSlides.map(slide => {
    return {
        index: slide.dataset.index,
        title: slide.dataset.title,
        description: slide.dataset.description,
    }
})

const createNavBtn = (data) => {
    return `<div>${data.title},${data.index}</div>`
}

const createSlides = (navigationData) => {
    const navSlides = {
        "page-0": [],
    };
    let currentSlide = 0;
    navigationData.forEach(data => {
        if (navSlides[`page-${currentSlide}`].length <= 5) {
            navSlides[`page-${currentSlide}`].push(createNavBtn(data))
        }
        if (navSlides[`page-${currentSlide}`].length === 5) {
            currentSlide++;
            navSlides[`page-${currentSlide}`] = [];
        }
    })

    return navSlides;
}

const result = createSlides(navigationData);

console.log(result)

const bannerNavigation = new Swiper(".js-banner-navigation", {});
