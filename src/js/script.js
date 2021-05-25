'use strict';

const initBurgerButton = () => {
   const burgerButton = document.querySelector('.burger-button');
   const overlay = document.querySelector('.overlay');
   const html = document.querySelector('html');

   burgerButton.addEventListener('click', function() {
      html.classList.toggle('lock');
      overlay.classList.toggle('open');
      this.classList.toggle('opened');
      this.setAttribute('aria-expanded', this.classList.contains('opened'));
   });
};

const bodyAutoPaddingTop = () => {
   const header = document.querySelector('body:not(.front) .header');

   if (header !== null) {
      const headerHeight = header.offsetHeight;
      
      const body = document.body;
      body.style.paddingTop = headerHeight + 'px';
   }
};

const initFixedHeader = () => {
   const header = document.querySelector('.header');
   const headerHeight = header.offsetHeight;

   if (window.pageYOffset > headerHeight) { 
      header.classList.add('fixed');
   } else {
      header.classList.remove('fixed');
   }
};

const autoHeight = (elements) => {
   let maxHeight = 0;

   elements.forEach(function(element) {
      maxHeight = element.scrollHeight;
   });

   elements.forEach(function(element) {
      element.style.height = maxHeight + 'px';
   });
};

const initAutoHeightPartnersLinks = () => {
   const partnersLinks = document.querySelectorAll('.partner-card__link');
   autoHeight(partnersLinks);
};

const initFeedbackModal = () => {
   const html = document.querySelector('html');
   const workBtn = document.querySelector('.work__btn');
   const feedbackModal = document.querySelector('#feedback-modal');

   workBtn.addEventListener('click', () => {
      html.classList.add('lock');
      feedbackModal.classList.add('open');
   });
};

const initCloseModal = () => {
   const html = document.querySelector('html');
   const modalCloseButtons = document.querySelectorAll('.modal__close');

   modalCloseButtons.forEach(function(button) {
      button.addEventListener('click', () => {
         html.classList.remove('lock');
         button.closest('.modal').classList.remove('open');
      });
   });
};

const initFeedbackForm = () => {
   const feedbackForm = document.querySelector('#feedback-form');
   const feedbackFormEmail = feedbackForm.querySelector('#feedback-form-email');

   const initFeedbackFormValidation = () => {
      feedbackFormEmail.addEventListener('input', function() {
         this.setCustomValidity('');

         if (this.validity.typeMismatch) {
            this.classList.add('error');
            this.classList.remove('success');
         } else {
            this.classList.remove('error');
            this.classList.add('success');
         }
            
         if (this.value.length === 0) {
            this.classList.remove('success');
         }
      });
   };
   
   const initFeedbackFormSubmit = () => {   
      feedbackForm.addEventListener('submit', (e) => {
         e.preventDefault();

         if (feedbackFormEmail.classList.contains('success')) {
            let url = "https://blackwh1te.github.io/de-landingpage/";
            let xhr = new XMLHttpRequest();

            xhr.open('POST', url);            
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Content-Length", "0");
            
            xhr.onreadystatechange = function () {               
               if (xhr.readyState === 4) {
                  feedbackForm.innerHTML = '<p>Your message successfully sent</p>';
               } else {
                  feedbackForm.innerHTML = '<p>Error. Please, try again later.</p>';
               }
            };
            
            xhr.send();
         }
      });
   };

   initFeedbackFormValidation();
   initFeedbackFormSubmit();
};

window.addEventListener('scroll', () => {
   initFixedHeader();
});

document.addEventListener('DOMContentLoaded', function () {
   initBurgerButton();
   bodyAutoPaddingTop();
   initFixedHeader();
   initAutoHeightPartnersLinks();
   initFeedbackModal();
   initCloseModal();
   initFeedbackForm();

}, false);