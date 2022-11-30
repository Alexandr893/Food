window.addEventListener('DOMContentLoaded',()=>{

const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

    // скрытие  табов 
    function hideTabContent(){
        tabsContent.forEach(item=>{
            item.style.display = 'none';

        });
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function ShowTabContent(i= 0){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    ShowTabContent();


    tabsParent.addEventListener('click',(e)=>{
        const target = e.target;
        // проверка на клик по табу
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach( (item,i)=>{
                if(target == item){
                    hideTabContent();
                    ShowTabContent(i);   
                }



            });
        }

    });

    // timer

    const deadLine = '2022-12-24';

    function getTime(endTime){
        const t= Date.parse(endTime)- Date.parse(new Date());
        // количество дней до конца
        days = Math.floor(t/(1000*60*60*24));
        hours = Math.floor((t/(1000*60*60)) % 24 );
        minutes = Math.floor((t/(1000/60))% 60);
        seconds = Math.floor((t/1000)%60);

        
        return {
            total:t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    // рендер

    function setClock(selector,endTime){
        // на вход родитель .timer
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
              timeInterval = setInterval(updateClock,1000);
            updateClock();

              function updateClock(){
                const t = getTime(endTime);

                days.innerHTML = t.days;
                hours.innerHTML = t.hours;
                minutes.innerHTML = t. minutes;
                seconds.innerHTML = t.seconds;
// total ушел в минус
                if(t.total <=0){
                    clearInterval(timeInterval);
                }
              }
    }



    setClock('.timer',deadLine);

// Modal

const modalTrigger = document.querySelectorAll("[data-modal]"),
modal = document.querySelector('.modal'),
modalCloseBtn = document.querySelector('[data-close]');

// мы не можем напрямую повесить методы класслист и тд.. к ним нужно обратиться перебором их же несколько темболее

modalTrigger.forEach(btn =>{
    btn.addEventListener('click',(openModal))});

function closeModal(){
    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(){
    modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
}

modalCloseBtn.addEventListener('click',(closeModal));


        modal.addEventListener('click',(e)=>{
            if(e.target === modal){
                closeModal();
            }
        });

    //modal inervav
    // const modalTimer = setTimeout(openModal,2000);


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

    // axios
    axios.get('http://localhost:3000/menu')
    .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
                });
        });





    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }



// slider

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');


    let slideIndex = 1;
    showSlides( slideIndex);

    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
    } 
    else{
        total.textContent = slides.length;
    }

    function showSlides(n){

        if(n > slides.length){
             slideIndex = 1;
        }
       if(n<1){
        slideIndex = slides.length;
       }
       slides.forEach(item=> item.style.display = 'none');
       slides[slideIndex-1].style.display = 'block';

       
       if (slides.length < 10){
        current.textContent = `0${slideIndex}`;
    } 
    else{
        current.textContent = slideIndex;
    }

    }

    function plusSlides(n){
        showSlides(slideIndex+=n);

    }

    prev.addEventListener('click',()=>{
        plusSlides(-1);
    });

    next.addEventListener('click',()=>{
        plusSlides(1);
    });
});

