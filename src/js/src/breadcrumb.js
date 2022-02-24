const breadcrumb = document.querySelector(".js-breadcrumb");
const currentRouteName = window.location.pathname.substring(1);
const currentRouteLink = breadcrumb.querySelector(`[data-link="${currentRouteName}"]`);
currentRouteLink.classList.add("_active");