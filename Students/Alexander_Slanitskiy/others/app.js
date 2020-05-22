'use strict';

class foodList {
    constructor(){
        this.items = [];
        this.buttons = document.querySelectorAll('input');
        this.labelButtons = document.querySelectorAll('label');
        this.amount = null;
        this.calories = null;
        this.caloriesEl = document.querySelector('.calculate__calories');
        this.amountEL = document.querySelector('.calculate__amount');
        this.url = 'https://raw.githubusercontent.com/Nev5ya/online-store-api/master/responses/burger-response/goodsList.json';
        this._init();
    }
    _init(){
        this._makeRequest(this.url)
            .then(data => {
                this.items = data;
                this._handleEvents();
            });
    }
    _makeRequest(url){
        return fetch(url).then(jsonData => jsonData.json());
    }
    _handleEvents(){
        this.buttons.forEach(button => {
            button.addEventListener('click', (event) =>{
                if (button.checked){
                    event.target.labels[0].parentNode.childNodes.forEach(childItem => {
                        if (childItem.nodeName === 'LABEL'){
                            childItem.classList.remove('checked-label');
                        }
                    });
                    button.labels[0].classList.add('checked-label');
                }
                this._amountCalc();
                this._caloriesCalc();
            });
        });
    }

    _amountCalc(){
        this.amount = null;
        this.labelButtons.forEach(labelButton => {
            if (labelButton.classList.contains('checked-label')){
                this.amount += this.items[+labelButton.attributes[0].nodeValue].product_price;
            }
        });
        this._renderPrice(this.amount);
    }
    _caloriesCalc(event){
        this.calories = null;
        this.labelButtons.forEach(labelButton => {
            if (labelButton.classList.contains('checked-label')){
                this.calories += this.items[+labelButton.attributes[0].nodeValue].product_calories;
            }
        });
        this._renderCalories(this.calories);
    }
    _renderPrice(amount){
        this.amountEL.innerText = 'Amount: ';
        this.amountEL.insertAdjacentText('beforeend', amount);
    }
    _renderCalories(calories){
        this.caloriesEl.innerText = 'Calories: ';
        this.caloriesEl.insertAdjacentText('beforeend', calories);
    }
}

let list = new foodList();