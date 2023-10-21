// 
const decreaseDiv = document.getElementById('decrease-btn');
const increaseDiv = document.getElementById('increase-btn');
const quantitySpan = document.getElementById('quantity');

let quantity = 1; // Số lượng ban đầu

decreaseDiv.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--; // Giảm số lượng nếu lớn hơn 1
    updateQuantity();
  }
});

increaseDiv.addEventListener('click', () => {
  quantity++; // Tăng số lượng
  updateQuantity();
});

function updateQuantity() {
  quantitySpan.textContent = quantity; // Hiển thị số lượng mới
}

// Gọi updateQuantity() để hiển thị số lượng ban đầu
updateQuantity();

const comboInput = document.getElementById('combo-input');
const options = document.getElementById('options').getElementsByTagName('option');

comboInput.addEventListener('input', () => {
  const enteredValue = comboInput.value.toLowerCase();

  for (const option of options) {
    if (option.value.toLowerCase() === enteredValue) {
      return;
    }
  }

  comboInput.setCustomValidity('Giá trị không hợp lệ');
});

comboInput.addEventListener('change', () => {
  comboInput.setCustomValidity('');
});

// Lắng nghe sự kiện click trên các thẻ a
document.getElementById('image').addEventListener('click', function() {
  // Ẩn tất cả các div chứa nội dung
  document.querySelectorAll('.content').forEach(function(content) {
      content.style.display = 'none';
  });
  // Hiển thị div chứa nội dung tương ứng
  document.getElementById('imageContent').style.display = 'block';
});

document.getElementById('utilities').addEventListener('click', function() {
  document.querySelectorAll('.content').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('utilitiesContent').style.display = 'block';
});

document.getElementById('point').addEventListener('click', function() {
  document.querySelectorAll('.content').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('poinContent').style.display = 'block';
});


document.getElementById('policy').addEventListener('click', function() {
  document.querySelectorAll('.content').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('policyContent').style.display = 'block';
});

document.getElementById('evaluate').addEventListener('click', function() {
  document.querySelectorAll('.content').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('evaluateContent').style.display = 'block';
});



 // Lấy danh sách các nút và thêm sự kiện click cho chúng
 const buttons = document.querySelectorAll(".content_coach_trip > button");

 buttons.forEach(button => {
     button.addEventListener("click", () => {
         // Bỏ tất cả các lớp 'active' từ các nút
         buttons.forEach(btn => btn.classList.remove("active"));
         
         // Thêm lớp 'active' cho nút đang được click
         button.classList.add("active");
     });
 });

 document.getElementById("showHideDetails").addEventListener("click", function() {
  var inforDiv = document.querySelector(".infor_coach_trip");
  inforDiv.classList.toggle("infor_coach_trip_after");
});


//Sự kiện click chuyển task trong đặt vé
document.getElementById('position_like').addEventListener('click', function() {
  // Ẩn tất cả các div chứa nội dung
  document.querySelectorAll('.booking_form').forEach(function(content) {
      content.style.display = 'none';
  });
  // Hiển thị div chứa nội dung tương ứng
  document.getElementById('form_positionlike').style.display = 'block';
});

document.getElementById('position_on_off').addEventListener('click', function() {
  document.querySelectorAll('.booking_form').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('form_position_onoff').style.display = 'block';
});

document.getElementById('get_infor').addEventListener('click', function() {
  document.querySelectorAll('.booking_form').forEach(function(content) {
      content.style.display = 'none';
  });
  document.getElementById('form_get_infor').style.display = 'block';
});

//Hiệu ứng khi chọn mục đặt vé
function highlight(element) {
  // Loại bỏ lớp CSS "highlighted" từ tất cả các thẻ có lớp "highlightable"
  const highlightableElements = document.querySelectorAll('.conner_stt');
  highlightableElements.forEach(el => el.classList.remove('conner_stt_after'));

  // Thêm lớp CSS "highlighted" cho thẻ vừa click
  element.classList.add('conner_stt_after');
}
const buttonBuy = document.querySelector('.button_buy');
const bookingForm = document.getElementById('bookingForm');
const tripInfor = document.getElementById('tripInfor');
const showhided = document.getElementById('showHideDetails');

// Đặt biến để theo dõi trạng thái hiển thị của form đặt vé
let isBookingFormVisible = false;

// Thêm sự kiện click cho nút Đặt vé
buttonBuy.addEventListener('click', () => {
  bookingForm.removeAttribute('style');
  tripInfor.style.display = 'none';
    // Đảm bảo nút Đặt vé đã được chọn
    if (isBookingFormVisible) {
        // Nếu form đang hiển thị, ẩn nó đi
        bookingForm.style.display = 'none';
        isBookingFormVisible = false;
    } else {
        // Nếu form đang ẩn, hiển thị nó
        bookingForm.style.display = 'block';
        isBookingFormVisible = true;
    }
});

// Đặt biến để theo dõi trạng thái hiển thị của form đặt vé
let isshowHide = false;

// Thêm sự kiện click cho nút Đặt vé
showhided.addEventListener('click', () => {
  tripInfor.removeAttribute('style');  
  bookingForm.style.display = 'none';
    // Đảm bảo nút Đặt vé đã được chọn
    if (isshowHide) {
        // Nếu form đang hiển thị, ẩn nó đi
        isshowHide = false;
    } else {
        // Nếu form đang ẩn, hiển thị nó
        isshowHide = true;
    }
});




  