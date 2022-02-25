import {hasClass} from "./common.js";

const breadcrumb = document.querySelector(".js-breadcrumb");
const currentRouteName = window.location.pathname.substring(1);
const currentRouteLink = breadcrumb.querySelector(`[data-link="${currentRouteName}"]`);
currentRouteLink.classList.add("_active");

breadcrumb.onclick = (e) => {
    if (hasClass(e.target, null, "breadcrumb__item")) {
        window.location.href = `/${e.target.dataset.link}`
    }
}