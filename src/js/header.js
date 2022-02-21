import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import {hasClass, detectMobile} from "./common.js";

const searchContainer = document.querySelector(".js-search-container");
const search = document.querySelector(".js-search");
const searchClose = document.querySelector(".js-close-search");

let isMobile = detectMobile();
let innerAccordions = null;

const mainCollapsesMenu = document.querySelector(".js-nav-main-section")
const innerCollapsesMenu = [...document.querySelectorAll(".js-nav-inner-section")];

const searchClickHandler = (e) => {
    console.log(e.target)
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
