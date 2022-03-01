import {getNoun, productCardClickEvents, hasClass, setMobileMenuHeight, getOneRem, detectMobile} from "./common";
import {submitForm} from "./request";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const catalogPage = document.querySelector(".js-catalog-page");
const catalogContainer = document.querySelector(".js-product-list");
const topFilter = document.querySelector(".js-top-filter")
const loader = document.querySelector("#loader");
const selected = document.querySelector(".js-selected");
const selectedList = document.querySelector(".js-selected ul");
const sideFilterBtn = document.querySelector(".js-slide-filter-btn");
const sideFilterContainer = document.querySelector(".js-filter-side");
const filterList = document.querySelector(".js-filter-list");
const filterItems = document.querySelectorAll(".js-filter-list input");
const header = document.querySelector(".js-header");
let currentBlock = 0;
let readyToLoad = true;
let oneRemValue = getOneRem();
let isMobile = detectMobile();
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
}
const filters = {
    type: catalogPage.dataset.type,
    sort: "hit",
    method: "ascending",
    filters: [],
    timeline: null,

    rerenderList() {
        const filterData = {
            type: this.type,
            sort: this.sort,
            method: this.method,
            filters: this.filters
        }

        console.log("rerender list")

        //раскоментировать когда будут реальные запросы
        // submitForm('post', "/api/product-list", filterData).then(res => {
        //     return res.json()
        // }).then(async data => {
        //     catalogContainer.innerHTML = data;
        // }).catch(e => {
        //     console.error(e)
        // });
    },

    set removeFilters(value) {
        this.filters.splice(this.filters.indexOf(value), 1);

        clearTimeout(this.timeline);
        this.timeline = null;
        this.timeline = setTimeout(() => {
            this.rerenderList();
            console.log("rerendered")
        }, 50)
    },

    set updateFilters(value) {
        const isSort = (typeof value === 'object' && value !== null)

        if (isSort) {
            for (const key in value) {
                this[key] = value[key];
            }
        } else {
            this.filters.push(value);
        }

        this.rerenderList();
    },

};

const filterAccordion = new Accordion(".js-filters-accordion", {
    duration: 300,
    showMultiple: true,
});

const handleSideMenuVisibility = () => {
    sideFilterContainer.classList.toggle("_opened");
}


const createSelectedItem = (el) => {
    const data = el.dataset.filter;
    const text = el.closest("label").innerText.split("(")[0].toLowerCase();
    return `<li data-filter="${data}" class="js-selected-item selected__item">${text}</li>`
}

const handleSelectedFilters = (e) => {
    if (hasClass(e.target, null, "js-selected-item")) {
        console.log(e.target)
        filterList.querySelector(`input[data-filter='${e.target.dataset.filter}']`).click();
    }

    if (hasClass(e.target, null, "js-selected-reset")) {
        filterList.querySelectorAll("input:checked").forEach(checkbox => checkbox.click());
    }

}

const handleSideFilter = (e) => {
    const value = e.currentTarget.dataset.filter;
    if (e.currentTarget.checked) {
        filters.updateFilters = value;
        const newSelectedItem = createSelectedItem(e.currentTarget);
        selectedList.insertAdjacentHTML("beforeend", newSelectedItem);
    } else {
        filters.removeFilters = value;
        selectedList.querySelector(`[data-filter="${value}"]`).remove();

    }
}

const handleTopSort = (e) => {
    const el = e.target;
    if (hasClass(e.target, null, "js-sort-filter") && !hasClass(e.target, null, "_active")) {
        el.parentElement.querySelector(".js-sort-filter._active").classList.remove("_active");
        el.classList.add("_active")
        const newValue = Object.assign({}, el.dataset);
        filters.updateFilters = newValue;
    } else if (hasClass(e.target, null, "js-method-filter")) {
        el.parentElement.querySelector(".js-method-filter._active").classList.remove("_active");
        el.classList.add("_active")
        const newValue = Object.assign({}, el.dataset);
        filters.updateFilters = newValue;
    }
}

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
            // console.log(filters)
            //удалить ниже тестовые данные
            insertNewPage(test[currentBlock])
            currentBlock++;
            if (currentBlock === test.length) {
                loader.style.display = "none";
            }
        });


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
        <img class="product-card__img lazyload" data-src="${content.image}" alt="product">
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
            <span>Купить</span>
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

window.onbeforeunload = () => window.scrollTo(0, 0);
filterItems.forEach(checkbox => checkbox.onchange = handleSideFilter);
topFilter.onclick = handleTopSort;
selected.onclick = handleSelectedFilters;
sideFilterBtn.onclick = handleSideMenuVisibility;

sideFilterContainer.addEventListener("click", (e) => {
    if (hasClass(e.target, "||", "js-side-filter-close", "js-filter-side")) {
        handleSideMenuVisibility();
    }
})

if (isMobile) {
    setMobileMenuHeight(sideFilterContainer, oneRemValue, 2, header);
} else {
    filterAccordion.openAll()
}

const observer = new IntersectionObserver(handleIntersect,
    options);
observer.observe(loader);

productCardClickEvents(catalogContainer);


