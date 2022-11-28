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


    class Menucard {
        constructor(src,alt,title,descr,price,parentSelector,  ...classes){
            this.src = src;
            this.alt= alt;
            this.title = title;
            this.descr = descr;
            // вернет уже измененное значение
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.ChangeToСurrency();
        }
// конвертация валюты
        ChangeToСurrency(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            this.classes.forEach(className =>element.classList.add(className));
            element.innerHTML = `
            <img src= ${this.src} alt=${this.alt}>
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



    new Menucard(
        // на вход
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new Menucard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();
    
    new Menucard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
'menu__item'
    ).render();

        // Forms

        const forms = document.querySelectorAll('form');
        const messages = {
            loading:'загрузка',
            success:'Спасибо',
            failure:'Что-то пошло не так',


        };

        forms.forEach(item=>{
            postData(item);
        });

        function postData(form){
            form.addEventListener('submit',(e)=>{
                e.preventDefault();

                const statusMessage=document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = messages.loading;
                form.append(statusMessage);


          
                // заголовки 
                
                const formData = new FormData(form);
                
                // получаем обычный объект
                const object ={};
                formData.forEach(function(value,key){
                    object[key] = value;
                });
            

                fetch('server.php',{
                    method:'POST',
                    header:{
                        'Content-type': 'application/json'
                    },
                    body:JSON.stringify(object)
                    
            
                  }).then(data => data.text())
                  .then(data => {
                        console.log(data);
                        statusMessage.textContent = messages.success;
                        
                        setTimeout(() => {
                            statusMessage.remove();
                        },2000);
                  }).catch(()=>{

                    statusMessage.textContent = messages.failure;
// finally идет независимо от resolve и reject
                  }).finally(()=>{
                    form.reset();
                  });

                  

              

                // проверка соединения 
                // request.addEventListener('load',()=>{
                //     if(request.status === 200){
                //         console.log(request.response);
                //         statusMessage.textContent = messages.success;
                //         form.reset();
                //         setTimeout(() => {
                //             statusMessage.remove();
                //         },2000);
                //     } else{
                //         statusMessage.textContent = messages.failure;
                //     }


                // });
            });
        }
        




});

