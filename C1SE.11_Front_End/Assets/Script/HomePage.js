window.addEventListener('scroll', () => {
    const content = document.querySelector('.content'); // Chọn thẻ div có class là "content"
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        content.classList.add('scrolled');
    } else {
        content.classList.remove('scrolled');
    }
});  

