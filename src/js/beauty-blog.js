import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
const beautyBlogContainer = document.querySelector(".js-blog-slider")
const beautyBlogSlider = new Swiper(beautyBlogContainer, {
    spaceBetween: 30,
    followFinger: false,
    slidesPerView: 3,
})

