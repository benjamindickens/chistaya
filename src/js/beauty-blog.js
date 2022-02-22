import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';

const beautyBlogContainer = document.querySelector(".js-blog-slider")
const beautyBlogSlider = new Swiper(beautyBlogContainer, {
    spaceBetween: 30,
    followFinger: false,
    slidesPerView: 3,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        667: {
            pagination: false,
            slidesPerView: 1,
            spaceBetween: 16,
        }
    },
})

