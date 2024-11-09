"use strict"

$(document).ready(function() {
    $(".js-scroll-btn").on("click", function() {
        $("html,body")
            .stop()
            .animate({
                    scrollTop: $(".toScroll").offset().top - 10,
                },
                "slow"
            );
    });

    $(".accordion__text").on("click", function() {
        if ($(this).hasClass("accordion__text-opened")) {
            $(this).removeClass("accordion__text-opened");
            $(this).siblings(".accordion__body").slideUp(300);
        } else {
            $(".accordion__text").removeClass("accordion__text-opened");
            $(this).addClass("accordion__text-opened");
            $(".accordion__body").slideUp(300);
            $(this).siblings(".accordion__body").slideDown(300);
        }
    });
});

function openTab(event) {
    let tabId = event.currentTarget.getAttribute('data-tab');
    let tabContents = document.querySelectorAll('.tab-content');
    let tabButtons = document.querySelectorAll('.tab-button');

    // Скрыть все содержимое вкладок
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        tab.style.opacity = '0'; // Плавное исчезновение
    });

    // Убрать активный класс со всех кнопок
    tabButtons.forEach(button => button.classList.remove('active'));

    // Показать текущую вкладку с задержкой для плавного появления
    setTimeout(() => {
        document.querySelector(`.tab-content[data-content="${tabId}"]`).classList.add('active');
    }, 100);

    // Увеличить прозрачность для анимации
    setTimeout(() => {
        document.querySelector(`.tab-content[data-content="${tabId}"]`).style.opacity = '1';
    }, 200);

    // Добавить активный класс на текущую кнопку
    event.currentTarget.classList.add('active');
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabId = button.getAttribute('data-tab');

        // Убираем класс "active" у всех кнопок и всех содержимых вкладок
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Добавляем класс "active" к текущей кнопке
        button.classList.add('active');

        // Находим все элементы с нужным data-content и делаем их активными
        document.querySelectorAll(`.tab-content[data-content="${tabId}"]`).forEach(content => {
            content.classList.add('active');
        });
    });
});

// Получаем содержимое шаблона
const templateContent = document.getElementById("common-template").content;

// Подставляем шаблон в каждый блок
document.querySelectorAll(".tabs-text .common-content").forEach((contentDiv) => {
    // Клонируем содержимое шаблона и добавляем в блок
    const clone = document.importNode(templateContent, true);
    contentDiv.appendChild(clone);
});

// Контейнер слайдера
let swiperWrapper = document.querySelector('.winner-wrapper');

// Создание слайдов на основе массива данных
dataList.forEach(data => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    slide.innerHTML = `
            <div class="first-block">
                <p class="city">${data.city}</p>
            </div>
            <img src="${data.profileImageSrc}" alt="" class="profile">
            <div class="second-block">
                <p class="name">${data.name}</p>
                <p class="sum">${data.sum}</p>
            </div>
            <button class="popupBtn">${data.buttonName}</button>
        `;

    swiperWrapper.appendChild(slide);
});
// Инициализация Swiper после добавления слайдов
const swiper = new Swiper('.winners', {
    spaceBetween: 12,
    centeredSlides: true,
    slidesPerView: 1.3,

    pagination: {
        el: '.winners-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.winners-button-next',
        prevEl: '.winners-button-prev',
        clickable: true,
    },
    breakpoints: {
        1024: {
            centeredSlides: false,
            slidesPerView: 4,
            spaceBetween: 20,
            navigation: {
                nextEl: '.winners-next',
                prevEl: '.winners-prev',
            },
        }
    },
});

const mobilePrize = new Swiper(".mobile-prize", {
    allowTouchMove: false,
    autoHeight: true,
    spaceBetween: 20,
});

const mobileSwiper = new Swiper('.mobile-swiper', {
    allowTouchMove: false,
    spaceBetween: 20,

    pagination: {
        el: '.mobile-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.mobile-button-next',
        prevEl: '.mobile-button-prev',
        clickable: true,
    },
});
mobilePrize.controller.control = mobileSwiper;
mobileSwiper.controller.control = mobilePrize;

const openPopupBtns = document.querySelectorAll(".popupBtn");
const body = document.querySelector("body")
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content");
const closePopupBtn = document.getElementById("closePopupBtn");

// Добавляем обработчик события для каждой кнопки
openPopupBtns.forEach(button => {
    button.addEventListener("click", function() {
        popup.style.display = "block";
        popupContent.classList.add("show");
        body.classList.add("overflow");

    });
});

// Закрываем попап при нажатии на кнопку закрытия
closePopupBtn.addEventListener("click", function() {
    popup.style.display = "none";
    popupContent.classList.remove("show");
    body.classList.remove("overflow");


});

// Закрываем попап при клике вне его
window.addEventListener("click", function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
        popupContent.classList.remove("show");

        body.classList.remove("overflow");

    }
});