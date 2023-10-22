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

//Xử lý dự đoán Điểm đi Điểm đến
function zmyFunction() {
  var input, filter, ul, li, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("city_list");
  li = ul.getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

function pmyFunction() {
  var input, filter, ul, li, txtValue;
  input = document.getElementById("searchInput1");
  filter = input.value.toUpperCase();
  ul = document.getElementById("city_list2");
  li = ul.getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

// Lấy danh sách các thẻ li
const cityItems = document.querySelectorAll('#city_list li');

// Lấy thẻ input
const searchInput = document.getElementById('searchInput');

// Gán sự kiện khi thẻ li được chọn
cityItems.forEach((item) => {
    item.addEventListener('click', () => {
        // Lấy nội dung của thẻ li và gán vào input
        searchInput.value = item.textContent;
        // Ẩn danh sách các mục (hoặc thực hiện xử lý khác tùy ý)
        document.getElementById('div_start').classList.add('hidden');
    });
});

const cityItems1 = document.querySelectorAll('#city_list2 li');

// Lấy thẻ input
const searchInput1 = document.getElementById('searchInput1');

// Gán sự kiện khi thẻ li được chọn
cityItems1.forEach((item) => {
    item.addEventListener('click', () => {
        // Lấy nội dung của thẻ li và gán vào input
        searchInput1.value = item.textContent;
        // Ẩn danh sách các mục (hoặc thực hiện xử lý khác tùy ý)
        document.getElementById('div_end').classList.add('hidden');
    });
});

const searchButton = document.getElementById('searchButton');

// Gắn sự kiện khi nút tìm kiếm được click
searchButton.addEventListener('click', () => {
    // Chuyển qua trang index.html
    window.location.href = 'LishCoach.html';
});

// Lấy thứ của ngày hiện tại
function getDayOfWeek() {
    const dateInput = document.getElementById("birthday");
    const selectedDate = new Date(dateInput.value);
    const daysOfWeek = ["2", "3", "4", "5", "6", "7", "CN"];
    const dayOfWeek = daysOfWeek[selectedDate.getDay()];
    return dayOfWeek;
  }
  
  // Cập nhật thứ trong phần p
  function updateDayOfWeek() {
    const dayOfWeekElement = document.getElementById("dayOfWeek");
    const dayOfWeek = getDayOfWeek();
    dayOfWeekElement.innerText = "Thứ " + dayOfWeek + ", ";
  }
  
  // Gắn sự kiện thay đổi vào trường ngày
  const dateInput = document.getElementById("birthday");
  dateInput.addEventListener("change", updateDayOfWeek);




