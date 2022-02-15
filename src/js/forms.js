import {submitForm} from "./request.js";

const forms = document.querySelectorAll("form");

forms.forEach(form => form.onsubmit = (e) => e.preventDefault())

const inputs = document.querySelectorAll(".js-input input");
inputs.forEach(input => input.onfocus = () => {
    input.parentElement.classList.remove("_error")
});

const setUpErrorField = (form, field, text) => {
    form.querySelector(`input[name='${field}']`).nextElementSibling.innerText = text;
    form.querySelector(`input[name='${field}']`).parentElement.classList.add("_error");
}

const validateEmail = (mail) => {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
        return (true)
    }
    return (false)
}

const validateData = (data, fields, form) => {
    let isValidData = true;
    fields.forEach(field => {
        if (field === "email") {
            const isValidEmail = validateEmail(data[field]);
            if (!isValidEmail) {
                setUpErrorField(form, field, "Введите корректный E-mail")
                isValidData = false;
            }
        }

        if (data[field] === "") {
            setUpErrorField(form, field, "Поле обязательно для заполнения")
            isValidData = false;
        }
    })

    return isValidData;
}

const getRequiredFields = (form) => {
    return [...form.querySelectorAll("[data-required]")].map(field => field.name);
}

const getFormData = (e, form) => {
    const formattedData = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => formattedData[key] = value);
    return formattedData;
}

//subscribe form
const subscribeForm = document.querySelector(".js-subscribe-form");

subscribeForm.addEventListener("click", function (e) {
    if (e.target.classList.contains("js-submit")) {
        const data = getFormData(e, this);
        const requiredField = getRequiredFields(this);
        const isValid = validateData(data, requiredField, this)

        isValid && console.log(data, "подписка выполнена")

        // расскоментировать
        // isValid && submitForm('post', "/api/subscribe", data).then(res => res.json()).then(data => {
        //     console.log("подписка выполнена")
        // }).catch(e => console.error(e));
    }
})