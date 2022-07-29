"use script"
const modal = new GraphModal();
/*
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android()
            || isMobile.BlackBerry()
            || isMobile.iOS()
            || isMobile.Opera()
            || isMobile.Windows()
        );
    }
}; //код определяет операционную систему и браузер и определяет это открыто на моб устройстве или на пк

if (isMobile.any()) {
    document.body.classList.add('_touch'); //если это открыто на мобильно устройстве, то к body добавляет класс _touch

    let menuArrows = document.querySelectorAll('.nav__arrow'); //собираю в переменную все стрелочки
    if (menuArrows.length > 0) { //условие, где проверяю есть ли вообще такие стрелочки
        for (let index = 0; index < menuArrows.length; index++) { //если есть, то пробегаемся по всем стрелочкам
            const menuArrow = menuArrows[index]; //создаю константу с каждой этой стрелочкой
            menuArrow.addEventListener("click", function (e) { //вешаю класс _active родительскому элементу нажатой стрелочке (если клас есть, то по клику он убирается, если нет, то создается)
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc'); //в обратном случае (если это пк), то к body добавляет класс _pc
}

//Меню бургер

const iconMenu = document.querySelector('.nav__icon'); //получаем наш обьект (иконку бургер)
const menuBody = document.querySelector('.nav__body'); //получаем в константу меню боди
if (iconMenu) { //делаем проверку есть ли у нас вообще такой класс
    iconMenu.addEventListener("click", function (e) { //создаем событие клик по иконке
        document.body.classList.toggle('_lock'); //обращаемся к body и будем добавлять или убираь для него класс lock
        iconMenu.classList.toggle('_active'); //для самой иконки добавляем или убираем класс active
        menuBody.classList.toggle('_active'); //для menuBody добавляем или убираем класс active
    });
}

//Прокрутка по клику

const menuLinks = document.querySelectorAll('.nav__link[data-goto]'); //массив обьектов, что участвуют в навигации (класс .nav__link с атребутами data-goto)
if (menuLinks.length > 0) { //проверка, есть ли что либо из этого
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick); //вешаем событие клик
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target; // обьект на который мы кликаем
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //проверяем заполнен ли дата атрибут и проверяем существует ли обьект на который ссылается данный дата атрибут
            const gotoBlock = document.querySelector(menuLink.dataset.goto); //получаем в константу сам этот обьект
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //вычисляем положение этого обьекта с учетом высоты хедера

            if (iconMenu.classList.contains('_active')) { //проверяем, если обьект (иконка меню) содержит класс active
                document.body.classList.remove('_lock'); //то удаляем у body класс lock
                iconMenu.classList.remove('_active'); //то удаляем у iconMenu класс active
                menuBody.classList.remove('_active'); //то удаляем у menuBody класс active
            }

            window.scrollTo({ //обращаемся к окну браузера; scrollTo - прокрутка
                top: gotoBlockValue, //прокрутка с самого верха до заданного обьекта
                behavior: "smooth" // плавная прокрутка
            });
            e.preventDefault(); //отключаем работу ссылки
        }
    }
} 
*/



const menu = document.querySelector('.nav'),
    burger = document.querySelector('.burger'),
    mobileBack = document.querySelector('.mobile-back'),
    overlay = document.querySelector('.overlay');

const lockScroll = () => {
    document.body.classList.add('lock');
}

const unlockScroll = () => {
    document.body.classList.remove('lock');
}

// const initialMenu = () => {
//     document.querySelector('.nav__list--dropdown').classList.remove('transformation');
//     document.querySelector('.nav').querySelector('.nav__list').classList.remove('transformation');
//     scrollTop();
// }

const scrollTop = () => {
    menu.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

burger.addEventListener('click', () => {
    menu.classList.add('open');
    overlay.classList.add('open');
    burger.classList.add('open');
    lockScroll();
    // initialMenu();
});

overlay.addEventListener('click', () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    burger.classList.remove('open');
    unlockScroll();
});

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link--drop')) {
        e.preventDefault();
        e.target.closest('.nav__list').classList.add('transformation');
        e.target.closest('.nav__item').querySelector('.nav__list--dropdown').classList.add('transformation');
        scrollTop();
    }

    if (e.target.classList.contains('mobile-back__link')) {
        e.preventDefault();
        e.target.closest('.nav__list--dropdown').classList.remove('transformation');
        e.target.closest('.nav').querySelector('.nav__list').classList.remove('transformation');
        scrollTop();
    }

    if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--drop')) {
        e.preventDefault();
        menu.classList.remove('open');
        overlay.classList.remove('open');
        unlockScroll();
    }
});



// .wrapper
const wrapper = document.querySelector('.sm_image-trail-section')
wrapper.addEventListener('mouseenter', (e) => {
    gsap.to(image, { autoAlpha: 1 })
})

wrapper.addEventListener('mouseleave', (e) => {
    gsap.to(image, { autoAlpha: 0 })
})

// img
const image = document.querySelector('.sm_image-trail')


wrapper.addEventListener('mousemove', (e) => {
    gsap.to(image, {
        duration: 0.9,
        x: e.pageX,
        y: e.pageY,
        skewX: e.movementX * 0.08,
        skewY: e.movementY * -0.02,
        scaleX: 1 + Math.abs(e.movementX) * .003,
        scaleY: 1 + Math.abs(e.movementY) * .001,
        ease: "Power3.inOut"
    })
})


// .container
const items = document.querySelectorAll('.sm_image-trail-container')
const imgArr = [
    "../images/advantage-mob.jpg",
    "../images/advantage-arr.jpg",
    "../images/advantage-qual.jpg",
    "../images/advantage-prof.jpg",
    "../images/advantage-ben.jpg",
];
items.forEach((el, i) => {

    el.addEventListener('mouseenter', (e) => {

        image.style.backgroundImage = `url(${imgArr[i]})`;

        gsap.set(image, { backgroundPosition: "center 0" });

        gsap.to(image, {
            duration: 0.8,
            backgroundPosition: "0 100%",
            repeat: 1,
            ease: "linear",
        });

    })

})

