window.addEventListener('scroll', () => {
    const content = document.querySelector('.content'); // Chọn thẻ div có class là "content"
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        content.classList.add('scrolled');
    } else {
        content.classList.remove('scrolled');
    }
}); 

//--Hiển thị list location start_end
const searchLocationStart = document.getElementById('start');
const searchLocationEnd = document.getElementById('end');
const listStart = document.getElementById('div_start');
const listEnd = document.getElementById('div_end');

listStart.classList.add('hidden');
listEnd.classList.add('hidden'); // Ẩn div_end ban đầu

document.addEventListener('click', (event) => {
    const isClickInsideStart = searchLocationStart.contains(event.target);
    const isClickInsideEnd = searchLocationEnd.contains(event.target);
  
    if (!isClickInsideStart && !isClickInsideEnd) {
      listStart.classList.add('hidden');
      listEnd.classList.add('hidden'); // Ẩn div_end nếu click bên ngoài
    }

});

searchLocationStart.addEventListener("click", function() {
    listStart.classList.toggle("hidden");
    listEnd.classList.add('hidden'); // Ẩn div_end khi click vào div_start
});

searchLocationEnd.addEventListener("click", function() {
    listEnd.classList.toggle("hidden");
    listStart.classList.add('hidden'); // Ẩn div_start khi click vào div_end
});

// Lấy thẻ a và div log_in theo id
var showLoginButton = document.getElementById("showLogin");
var loginBox = document.getElementById("form_loginout");

// Thêm sự kiện click cho thẻ a
showLoginButton.addEventListener("click", function(e) {
  e.preventDefault(); // Ngăn chặn chuyển hướng mặc định nếu thẻ a có href

  // Kiểm tra xem div có lớp active không
  if (loginBox.classList.contains("form_in_out_after")) {
    // Nếu có, loại bỏ lớp "active" để ẩn div
    loginBox.classList.remove("form_in_out_after");
  } else {
    // Nếu không, thêm lớp "active" để hiển thị div
    loginBox.classList.add("form_in_out_after");
  }
});



// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





  



