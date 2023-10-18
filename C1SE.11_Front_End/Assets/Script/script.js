// Lấy danh sách các thẻ .box
const boxes = document.querySelectorAll(".box");

// Đặt sự kiện click cho mỗi thẻ .box
boxes.forEach(box => {
    box.addEventListener("click", () => {
        // Loại bỏ lớp 'selected' từ tất cả các thẻ .box
        boxes.forEach(b => {
            b.classList.remove("selected");
        });
        
        // Thêm lớp 'selected' cho thẻ đang được click
        box.classList.add("selected");
    });
});
