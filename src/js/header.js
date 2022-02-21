import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import {hasClass, detectMobile} from "./common.js";

const searchContainer = document.querySelector(".js-search-container");
const search = document.querySelector(".js-search");
const burgerBtn = document.querySelector(".js-burger-btn");
const mobileMainSection = document.querySelector(".js-mobile-menu-container");

let isMobile = detectMobile();
let innerAccordions = null;

const mainCollapsesMenu = document.querySelector(".js-nav-main-section")
const innerCollapsesMenu = [...document.querySelectorAll(".js-nav-inner-section")];

const searchClickHandler = (e) => {
    if (hasClass(e.target, null, "js-open-search")) {
        search.focus()
    } else if (hasClass(e.target, null, "js-close-search")) {
        search.value = "";
    }
}

const setSearchType = (el) => {
    if (isMobile) {
        el.type = "text";
    } else {
        el.type = "search";
    }
}

const mainAccordion = new Accordion(mainCollapsesMenu, {
    duration: 300,
    showMultiple: false,
    beforeClose() {
        innerAccordions.forEach((accordion, index) => {
            accordion.closeAll();
        })
    }
});

innerAccordions = new Accordion(innerCollapsesMenu, {
    duration: 300,
    showMultiple: false,
});

//search

setSearchType(search);

searchContainer.addEventListener("click", searchClickHandler)

search.addEventListener('focus', (event) => {
    searchContainer.classList.toggle("_active");
});

search.addEventListener('blur', (event) => {
    searchContainer.classList.toggle("_active");
    if (detectMobile()) {
        search.value = "";
    }
});

window.addEventListener("resize", () => {
    if (detectMobile() && !isMobile) {
        isMobile = true;
        setSearchType(search);
    } else if (!detectMobile() && isMobile) {
        isMobile = false;
        setSearchType(search);
    }
})

//mobile menu

burgerBtn.addEventListener("click", function () {
    if (!hasClass(this, null, "_opened")) {
        mobileMainSection.classList.add("_opened");
        this.classList.add("_opened")
    } else {
        mobileMainSection.classList.remove("_opened");
        this.classList.remove("_opened")
    }

})