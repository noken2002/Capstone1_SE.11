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






  



