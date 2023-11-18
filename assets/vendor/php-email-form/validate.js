/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.getElementById('gform');

  forms.addEventListener('submit', function(event) {
    event.preventDefault();

    let thisForm = this;

    let action = thisForm.getAttribute('action');
    
    if( ! action ) {
      displayError(thisForm, 'The form action property is not set!');
      return;
    }

    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');
    
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let message = document.getElementById("message");

    let formData = new FormData;
    const request = new XMLHttpRequest;
  
    formData.append("name" , name.value);
    formData.append("email" , email.value);
    formData.append("subject" , subject.value);
    formData.append("message" , message.value);

    request.open("POST" ,"https://script.google.com/macros/s/AKfycbyFsS0JLSsCFaY2BCP5jGp-N86_fovtepC69HZdF9F74t0-y8csVd2x8OCdGsOWx8mz/exec")
    request.addEventListener("readystatechange" , function name(params) {
      if(request.readyState == XMLHttpRequest.DONE){
        if(request.status === 200){
          const response = JSON.parse(request.response);
          if(response.result == "success"){
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.add('d-block');
          } else {
            console.error(response);
            displayError(thisForm , "메일 전송에 실패했습니다.");
          }
        }
      }
    })
    request.send(formData);
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
