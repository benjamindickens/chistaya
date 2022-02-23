import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';

const beautyBlogContainer = document.querySelector(".js-blog-slider")
const beautyBlogSlider = new Swiper(beautyBlogContainer, {
    spaceBetween: 30,
    followFinger: false,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.beauty-blog__nav-btn.swiper-button-next',
        prevEl: '.beauty-blog__nav-btn.swiper-button-prev',
    },
    breakpoints: {
        667: {
            navigation: false,
            pagination: false,
            slidesPerView: 3,
            spaceBetween: 16,
        }
    },
})

