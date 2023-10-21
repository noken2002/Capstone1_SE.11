//--Lựa chọn phương thức nhận diện khuôn mặt

const linkFace = document.querySelector('.form_facechoose');
const linkQR = document.querySelector('.form_qrchoose');
const linkInput = document.querySelector('.form_inputchoose');



linkFace.addEventListener("click", function() {
    window.location.href = 'LookupInvoices.html';
});
linkQR.addEventListener("click", function() {
    window.location.href = 'LookupInvoicesQR.html';
});
linkInput.addEventListener("click", function() {
    window.location.href = 'LookupInvoicesInput.html';
});
