new Swiper(".auto-swiper__inner", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 15,
  initialSlide: 3,
  centeredSlides: true,
  mousewheel: {
    enabled: true,
    eventsTarget: ".auto-swiper__inner", // или 'container'
    forceToAxis: true, // только горизонтальная прокрутка
  },
  touchEventsTarget: "container",
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    540: {
      slidesPerView: 3,
    },
    750: {
      slidesPerView: 4,
    },
  },
});
new Swiper(".reviews__swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
  nextEl: ".reviews__swiper-wrapper .swiper-button-next",
  prevEl: ".reviews__swiper-wrapper .swiper-button-prev",
},
  mousewheel: {
    enabled: true,
    eventsTarget: ".reviews__swiper", // или 'container'
    forceToAxis: true, // только горизонтальная прокрутка
  },
  touchEventsTarget: "container",
  breakpoints: {
    1230: {
      spaceBetween: 30,
    },
    767.98: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

new Swiper(".pasting__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    1230: {
      slidesPerView: 2.77,
    },
    991.8: {
      slidesPerView: 2.3,
    },
    767.98: {
      slidesPerView: 2,
    },
    468: {
      slidesPerView: 1.6,
    },
  },
});
new Swiper(".technological-approach__swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".technological-approach__swiper-wrapper .swiper-button-next",
    prevEl: ".technological-approach__swiper-wrapper .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    575.98: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
});
