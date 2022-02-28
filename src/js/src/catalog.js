import {getNoun, productCardClickEvents, hasClass} from "./common";
import {submitForm} from "./request";

const catalogPage = document.querySelector(".js-catalog-page");
const catalogContainer = document.querySelector(".js-product-list ");
const topFilter = document.querySelector(".js-top-filter")
const loader = document.querySelector("#loader");
let currentBlock = 0;
let readyToLoad = true;
const filters = {
    type: catalogPage.dataset.type,
    sort: "hit",
    method: "ascending"
};

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
}

const handleTopFilter = (e) => {
    const el = e.target;
    if (hasClass(e.target, null, "js-sort-filter") && !hasClass(e.target, null, "_active")) {
        el.parentElement.querySelector(".js-sort-filter._active").classList.remove("_active");
        el.classList.add("_active")
    } else if (hasClass(e.target, null, "js-method-filter")) {
        el.parentElement.querySelector(".js-method-filter._active").classList.remove("_active");
        el.classList.add("_active")
    }
}


// ниже генератор тестовых данных удалить

const insertTypeBar = (content) => {
    return content.map(type => `<div data-type="${type}" class="product-card__type-bar"></div>`).join("");
}

const dummyDataGenerator = (num) => {
    const array = new Array(num).fill(0);
    return array.map((el, index) => {
        return {
            id: 1,
            link: "https://test.ru",
            title: "test",
            description: "test",
            volume: 200,
            comments: 20,
            image: `https://picsum.photos/id/${index + 90}/200/`,
            type: ["new"],
        }
    })
}

const getSlide = (content) => {
    return `<div data-href="${content.link}" data-product-id="${content.id}"  class="js-product-card product-card">
<div class="product-card__type-section">
${insertTypeBar(content.type)}
</div>
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

const dummyData = dummyDataGenerator((4 * 4) * 3);

const getPage = (content) => {
    return `<div class="js-product-page catalog-page__product-page">
${content}
</div>`
}

const getDummyPages = (dummyData) => {
    let page = 1;
    const dummyPages = [];
    let currentPageContent = "";
    dummyData.forEach((data, index) => {
        currentPageContent += getSlide(data);

        if ((index + 1) / page === 4 * 4 || dummyData.length === index + 1) {
            dummyPages.push(getPage(currentPageContent));
            page++;
            currentPageContent = "";
        }
    })
    return dummyPages
}

const test = getDummyPages(dummyData)


// конец генератор тестовых данных


const insertNewPage = (content) => {
    catalogContainer.insertAdjacentHTML("beforeend", content);
}

const handleIntersect = (entries, observer) => {
    if (entries[0].isIntersecting && readyToLoad) {
        submitForm('post', "/api/hits", filters).then(res => {
            //раскоментировать когда будут реальные запросы
            // readyToLoad = false;
            return res.json()
        }).then(async data => {
            await insertNewPage(data)
            currentBlock += 1;
            readyToLoad = true;
        }).catch(e => {
            console.error(e)
            console.log(filters)
            //удалить ниже тестовые данные
            insertNewPage(test[currentBlock])
            currentBlock++;
            if (currentBlock === test.length) {
                loader.style.display = "none";
            }
        });


    }
}

topFilter.onclick = handleTopFilter;
const observer = new IntersectionObserver(handleIntersect,
    options);
observer.observe(loader);

productCardClickEvents(catalogContainer)


