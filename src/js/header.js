import {submitForm} from "./request.js";

const menu = document.querySelector(".js-header");

let downloadedDropdownContent = [];

const dummySmallProductData = [
    {
        "name": "Шампунь объем и сила волос",
        "link": "https://lol/ru",
        "hit": true,
        "img": "https://i.ibb.co/BV3WFTq/Frame-4805.png"
    },
    {
        "name": "Шампунь объем и сила волос",
        "link": "https://lol/ru",
        "hit": true,
        "img": "https://i.ibb.co/BV3WFTq/Frame-4805.png"
    },
    {
        "name": "Шампунь объем и сила волос",
        "link": "https://lol/ru",
        "hit": true,
        "img": "https://i.ibb.co/BV3WFTq/Frame-4805.png"
    },
    {
        "name": "Шампунь объем и сила волос",
        "link": "https://lol/ru",
        "hit": true,
        "img": "https://i.ibb.co/BV3WFTq/Frame-4805.png"
    },
];

const createCards = (data, container) => {
    container.innerHTML = "";
    data.forEach(data => {
        const card = `<li><a href="${data.link}" target="_blank">
                        <div class="dropdown-menu__popular-item small-product-card ${data.hit ? '_hit' : ''}">
                            <img src="${data.img}" class="small-product-card__img" alt="product">
                            <p class="small-product-card__name">${data.name}</p>
                        </div>
                    </a></li>`

        container.insertAdjacentHTML("beforeend", card)
    })
}

const handleMenuHover = (e) => {
    const hoveredEl = e.target;

    if (hoveredEl.classList.contains("js-menu-btn")) {
        const currentDropdownContent = hoveredEl.dataset.content;
        if (!downloadedDropdownContent.includes(currentDropdownContent)) {
            downloadedDropdownContent.push(currentDropdownContent);
            const productContainer = hoveredEl.parentElement.querySelector(".js-popular");
            //удалить
            createCards(dummySmallProductData, productContainer)
            //раскоментировать

            // submitForm("get", '/header/currentContent', data,
            // ).then(res => res.json()).then(data => {
            //     createCards(data, productContainer)
            // }).catch(e => console.error(e));
        }
    }
}

menu.addEventListener("mouseover", handleMenuHover)
