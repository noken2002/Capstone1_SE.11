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
  