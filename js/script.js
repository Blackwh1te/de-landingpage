'use strict';

const initBurgerButton = () => {
   const burgerButton = document.querySelector('.burger-button');
   const overlay = document.querySelector('.overlay');
   const body = document.body;

   burgerButton.addEventListener('click', function() {
      body.classList.toggle('lock');
      overlay.classList.toggle('open');
      this.classList.toggle('opened');
      this.setAttribute('aria-expanded', this.classList.contains('opened'));
   });
};

// const bodyAutoPaddingTop = () => {
//    const header = document.querySelector('header');
//    const headerHeight = header.offsetHeight;
   
//    const body = document.body;
//    body.style.paddingTop = headerHeight + 'px';
// };

const initFixedHeader = () => {
   const header = document.querySelector('header');
   const headerHeight = header.offsetHeight;
   
   // console.log(window.scrollTop);
   // if ($(window).scrollTop() > headerHeight) { 

   if (window.pageYOffset > headerHeight) { 
      header.classList.add('fixed');
   } else {
      header.classList.remove('fixed');
   }
};

window.addEventListener('scroll', () => {
   initFixedHeader();
});


document.addEventListener('DOMContentLoaded', function () {
   initBurgerButton();
   // bodyAutoPaddingTop();
   initFixedHeader();




}, false);