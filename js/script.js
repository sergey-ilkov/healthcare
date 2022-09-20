// ---------------- burger menu
const burgerMenu = document.querySelector('.burger__menu');
const headerMenu = document.querySelector('.header__menu');
const headerItems = document.querySelectorAll('.header__menu-item');
const headerLogo = document.querySelector('.header__logo');

burgerMenu.classList.add('toggled');
burgerMenu.addEventListener('click', (e) => {
    burgerMenu.classList.toggle('active');
    burgerMenu.classList.toggle('toggled');
    body.classList.toggle('active');
    headerMenu.classList.toggle('active');
});
headerItems.forEach((item) => {
    item.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        burgerMenu.classList.add('toggled');
        body.classList.remove('active');
        headerMenu.classList.remove('active');
    });
});

headerLogo.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    burgerMenu.classList.add('toggled');
    body.classList.remove('active');
    headerMenu.classList.remove('active');
});
//  Обработка клика и потеря фокуса select
const searchSelect = document.querySelector('.search-select');
const formSearchSelect = document.querySelector('.form__search-select');

searchSelect.addEventListener('click', (e) => {
    searchSelect.classList.toggle('active');
});
formSearchSelect.addEventListener('blur', (e) => {
    searchSelect.classList.remove('active');
});

const animItems = document.querySelectorAll('._anim-items');
const headerIconsBox = document.querySelector('.header__icons-box');
// после полной загрузки страницы
window.onload = () => {
    headerIconsBox.classList.add('active');
    let items = [...headerIconsBox.children];
    let count = 1.3;
    items.forEach((item) => {
        count += 0.3;
        item.style.animationDelay = `${count}s`;
    });

    // анимация текста
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            animItems.forEach((item) => {
                const animItemHeight = item.offsetHeight;
                const animItemOffset = offset(item).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
                    item.classList.add('_active');
                }
            });
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    // slick slider
    $('.services__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    prevArrow: `<button type="button" class="slick-prev"><div class="services__slider-btn"></div></button>`,
                    nextArrow: `<button type="button" class="slick-next"><div class="services__slider-btn"></div></button>`,
                },
            },
        ],
    });
    $('.clients__slider').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: `<button type="button" class="slick-prev"><div class="clients__slider-btn"></div></button>`,
        nextArrow: `<button type="button" class="slick-next"><div class="clients__slider-btn"></div></button>`,
        responsive: [
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
};

//
// ---------------- animaition modal and secret code
//
const body = document.querySelector('body');
const modal = document.querySelector('.modal');
let str = '';
const reference = '105alpdf108alpdf107alpdf111alpdf118alpdf105alpdf108alpdf107alpdf111alpdf118';
const ref = reference
    .split('alpdf')
    .map((item) => String.fromCharCode(item))
    .join('');

document.addEventListener('keydown', (e) => {
    str += e.key;
    if (ref.indexOf(str) !== 0) {
        str = '';
        return;
    }
    if (str === ref) {
        body.classList.add('active');
        modal.classList.add('active');
        str = '';
        svgAnim();
    }
});
//
// ---------------- animaition svg text
//
const paths = document.querySelectorAll('#svg-anim .path');

paths.forEach((item) => {
    const len = Math.ceil(item.getTotalLength());
    item.style.strokeDasharray = `${len}px`;
    item.style.strokeDashoffset = `${len}px`;
});
const elSvg = modal.querySelector('#svg-anim');
let countSvg = 0;
function svgAnim() {
    elSvg.style.animation = `anim-block .3s ease-in forwards`;
    paths.forEach((item) => {
        item.style.animation = `anim-line 1.5s ease forwards`;
        item.style.animationDelay = `${countSvg}s`;
        countSvg += 0.15;
    });
}
//
//
//
const linkDev = document.querySelector('.developer');
linkDev.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    svgAnim();
});
const modalBtn = document.querySelector('.modal__btn');
modalBtn.addEventListener('click', () => {
    body.classList.remove('active');
    modal.classList.remove('active');
    countSvg = 0;
});
