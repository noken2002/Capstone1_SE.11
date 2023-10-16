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

function open(evt, extentionsName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(extentionsName).style.display = "block";
  evt.currentTarget.className += " active";
}

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



  