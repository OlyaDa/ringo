const bannerSlider = new Swiper('.banner-slider', {
    slidesPerView: 1,
    loop: true,
    speed: 500,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
    navigation: {
        nextEl: '.banner__next',
        prevEl: '.banner__prev',
    },
});

const workingSlider = new Swiper('.working-slider', {
    loop: true,
    centeredSlides: true,
    speed: 500,
    navigation: {
        nextEl: '.working__next',
        prevEl: '.working__prev',
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
          // when window width is >= 1001px
        1001: {
            slidesPerView: 2.615,
            spaceBetween: 40,
        },
        // when window width is >= 741px
        741: {
            slidesPerView: 1.7,
            spaceBetween: 40,
        },
        // when window width is >= 639px
        639: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
    }
});

const partnersSlider = new Swiper('.partners-slider', {
    slidesPerView: 2,
    loop: true,
    spaceBetween: 20,
    speed: 500,
    navigation: {
        nextEl: '.partners__next',
        prevEl: '.partners__prev',
    },
    breakpoints: {
        741: {
            slidesPerView: 4,
        },
        501: {
            slidesPerView: 2,
            // spaceBetween: 0,
        },
    }
});

