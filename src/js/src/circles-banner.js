import CircleProgress from 'js-circle-progress'

const circles = document.querySelectorAll(".js-circle");

circles.forEach((circle, index) => {
    const currentCircle = new CircleProgress(circle, {
        value: circle.dataset.value,
        max: 100,
        textFormat: 'percent',
    })

})