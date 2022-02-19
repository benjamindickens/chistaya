import Swiper from 'swiper/swiper-bundle.min';
import 'swiper/swiper-bundle.min.css';
import {getNoun} from "./common.js";

const hitsSliderContainer = document.querySelector(".js-hits-slider");

const hitsSlider = new Swiper(hitsSliderContainer, {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 5,
    navigation: {
        nextEl: '.js-hits-nav.swiper-button-next',
        prevEl: '.js-hits-nav.swiper-button-prev',
    },
})

//logic for frontend rendering using virtual slides

const getTemplate = (content) => {
    return `<a href="${content.link}" data-product-id="1" class="js-product-card product-card _hit">
                            <div class="product-card__content">
                                <img class="product-card__img" src="images/test-header-card.png" alt="product">
                                <h3 class="product-card__title">
                                    Шампунь объем и сила с экстрактом льна и пшеницы
                                </h3>
                                <p class="product-card__description">
                                    для тонких и ослабленных волос
                                </p>
                                <p class="product-card__volume">
                                    400 мл
                                </p>
                                <div class="product-card__stats">
                                    <div data-stars="4" class="product-card__stars"></div>
                                    <a href="${content.link}#comments" class="product-card__comments">32 отзыва</a>
                                </div>
                                <button class="js-buy-btn product-card__btn main-btn _green">
                                    Купить
                                </button>
                            </div>
                        </a>`
}

