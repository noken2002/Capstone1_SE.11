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
const searchLocation = document.querySelector('.search_location');
const listStart = document.querySelector('.list_start');

listStart.classList.add('hidden');

document.addEventListener('click', (event) => {
    const isClickInside = searchLocation.contains(event.target);
  
    if (!isClickInside) {
      listStart.classList.add('hidden');
    }
  });

searchLocation.addEventListener("click", function() {
    listStart.classList.toggle("hidden");
  });

  



