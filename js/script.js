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



            })
        }

    });



















});