'use strict';

const initBurgerButton = () => {
   const burgerButton = document.querySelector('.burger-button');

   burgerButton.addEventListener('click', function() {
      this.classList.toggle('opened');
      this.setAttribute('aria-expanded', this.classList.contains('opened'));
   });
};

document.addEventListener('DOMContentLoaded', function () {
   initBurgerButton();
}, false);