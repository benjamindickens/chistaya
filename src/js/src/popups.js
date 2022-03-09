import {hasClass} from "./common";
import {submitForm} from "./request";

const Popup = class {
    constructor() {
        this.container = document.querySelector(".js-popup");
        this.content = document.querySelector(".js-popup-content");
        this.close = document.querySelector(".js-popup-close")
        this.initPopup();
    }

    initPopup() {
        if (!this.container) {
            const template = `<div class="js-popup popup">
            <div class="popup__container">
             <div class="js-popup-close popup__close"></div>    
             <div class="js-popup-content popup__content">
             
</div>
              
            </div>
        </div>`

            document.body.insertAdjacentHTML("afterbegin", template);
            this.container = document.querySelector(".js-popup");
            this.content = document.querySelector(".js-popup-content");
            this.close = document.querySelector(".js-popup-close")
            this.closePopup();
        }
    }

    findStore = (data, store) => {
        return data.some(item => item.name.toLowerCase() === store.toLowerCase())
    }

    findLink = (data, store) => {
        const current = data.find(item => item.name.toLowerCase() === store.toLowerCase())
        return current ? current.link : "";
    }

    whereToBuyTemplate = (data) => {

        return `<div class="where-to-buy-popup">
            <h1 class="where-to-buy-popup__title">Выберите интернет-магазин</h1>
            <p class="where-to-buy-popup__text">Для покупок мы предлагаем несколько сайтов партнеров</p>
            <ul class="where-to-buy-popup__store-list">
                <li class="where-to-buy-popup__item">
                    <div class="where-to-buy-popup__img _ozon">                    
                    </div>
                    <a data-availability="${this.findStore(data, "ozon")}" target="_blank" href="${this.findLink(data, "ozon")}" class="where-to-buy-popup__button"></a>
                </li>
                <li class="where-to-buy-popup__item">
                    <div class="where-to-buy-popup__img _wildberries">          
                    </div>
                    <a data-availability="${this.findStore(data, "wildberries")}" target="_blank" href="${this.findLink(data, "wildberries")}" class="where-to-buy-popup__button"></a>
                </li>
                <li class="where-to-buy-popup__item">
                    <div class="where-to-buy-popup__img _auchan"> 
                    </div>
                    <a data-availability="${this.findStore(data, "auchan")}" target="_blank" href="${this.findLink(data, "auchan")}" class="where-to-buy-popup__button"></a>
                </li>
            </ul>
            <div class="where-to-buy-popup__afterwords">Спасибо, приятных покупок вместе с Чистой Линией!</div>
        </div>
`
    }

    openWhereToBuy(el) {
        const id = el.dataset.id;
        submitForm('post', "/api/stores", id).then(res => {
            return res.json()
        }).then(async data => {
            this.content.innerHTML = this.whereToBuyTemplate(data);
        }).then(() => {
            this.container.classList.add("_opened")
        }).catch(e => {
            console.error(e)

            //удалить тестовая дата
            const dummyData = [{name: "auchan", link: "https://geg"},{name: "ozon", link: "https://dsfdasfdasfdas.ru"}];
            this.content.innerHTML = this.whereToBuyTemplate(dummyData);
            this.container.classList.add("_opened");
        });


    }

    closePopup() {
        window.addEventListener("click", (e) => {
            if (hasClass(e.target, "||", "js-popup", "js-popup-close")) {
                this.container.classList.remove("_opened");
            }
        })

    }

}

export {Popup};