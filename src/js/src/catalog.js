import {getNoun} from "./common";

const dummyDataGenerator = (num) => {
    const array = new Array(num).fill(0);
    return array.map((el, index) => {
        return {
            link: "https://test.ru",
            title: "test",
            description: "test",
            volume: 200,
            comments: 20,
            image: `https://picsum.photos/id/${index + 90}/200/`,
            type: "new",
        }
    })
}
const getSlide = (content) => {
    return `<div data-href="${content.link}" data-type="${content.type}" data-product-id="1"  class="js-product-card product-card _hit">
        <img class="product-card__img" src="${content.image}" alt="product">
        <h3 class="product-card__title">
            ${content.title}
        </h3>
        <p class="product-card__description">
            ${content.description}
        </p>
        <p class="product-card__volume">
            ${content.volume} мл
        </p>
        <div class="product-card__stats stats">
            <div data-stars="4" class="stats__stars"></div>
            <a href="${content.link}#comments" class="js-product-comments stats__comments">${getNoun(content.comments, "отзыв",
        "отзыва", "отзывов")}</a>
        </div>
        <button class="js-buy-btn product-card__btn main-btn _green">
            Купить
        </button>
    </div>`
}