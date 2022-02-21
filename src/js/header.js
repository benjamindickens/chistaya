import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const menu = document.querySelector(".js-header-menu");
const dropdowns = document.querySelectorAll(".js-dropdown");

let innerAccordions = null;


const mainCollapsesMenu = document.querySelector(".js-nav-main-section")
const innerCollapsesMenu = [...document.querySelectorAll(".js-nav-inner-section")];

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