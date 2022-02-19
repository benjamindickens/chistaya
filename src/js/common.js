const hasClass = (el, logicOperator = "||", ...classNames) => {
    const results = classNames.map(className => el.classList.contains(className));
    return logicOperator === "&&" ? !results.includes(false) : results.includes(true);
}

const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return number + " " + five;
    }
    n %= 10;
    if (n === 1) {
        return number + " " + one;
    }
    if (n >= 2 && n <= 4) {
        return number + " " + two;
    }
    return number + " " + five;
}

const productCardClickEvents = (container) => {
    container.addEventListener("click", (e) => {
        if (!hasClass(e.target, "||", "js-buy-btn", "js-product-comments")) {
            location.href = e.target.closest(".js-product-card").dataset.href;
        } else if (hasClass(e.target, null, "js-buy-btn")) {
            //logic for buy btn
        }
    })
}


export {hasClass, getNoun, productCardClickEvents}