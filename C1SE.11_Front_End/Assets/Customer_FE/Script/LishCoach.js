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
document.getElementById('image').addEventListener('click', function () {
  // Ẩn tất cả các div chứa nội dung
  document.querySelectorAll('.content').forEach(function (content) {
    content.style.display = 'none';
  });
  // Hiển thị div chứa nội dung tương ứng
  document.getElementById('imageContent').style.display = 'block';
});

document.getElementById('utilities').addEventListener('click', function () {
  document.querySelectorAll('.content').forEach(function (content) {
    content.style.display = 'none';
  });
  document.getElementById('utilitiesContent').style.display = 'block';
});

document.getElementById('point').addEventListener('click', function () {
  document.querySelectorAll('.content').forEach(function (content) {
    content.style.display = 'none';
  });
  document.getElementById('poinContent').style.display = 'block';
});


document.getElementById('policy').addEventListener('click', function () {
  document.querySelectorAll('.content').forEach(function (content) {
    content.style.display = 'none';
  });
  document.getElementById('policyContent').style.display = 'block';
});

document.getElementById('evaluate').addEventListener('click', function () {
  document.querySelectorAll('.content').forEach(function (content) {
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

document.getElementById("showHideDetails").addEventListener("click", function () {
  var inforDiv = document.querySelector(".infor_coach_trip");
  inforDiv.classList.toggle("infor_coach_trip_after");
});


//Sự kiện click chuyển task trong đặt vé
document.getElementById('position_like').addEventListener('click', function () {
  // Ẩn tất cả các div chứa nội dung
  document.querySelectorAll('.booking_form').forEach(function (content) {
    content.style.display = 'none';
  });
  // Hiển thị div chứa nội dung tương ứng
  document.getElementById('form_positionlike').style.display = 'block';
});

document.getElementById('position_on_off').addEventListener('click', function () {
  document.querySelectorAll('.booking_form').forEach(function (content) {
    content.style.display = 'none';
  });
  document.getElementById('form_position_onoff').style.display = 'block';
});

document.getElementById('get_infor').addEventListener('click', function () {
  document.querySelectorAll('.booking_form').forEach(function (content) {
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

//Checkbox Function
function myFunctioncheckbox() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  var text = document.getElementById("text");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

let seat = [];
const price = 480000;
let price_text = document.querySelectorAll(".price_text");

function selectSeat(e, seatNumber) {
  const isChecked = e.target.checked;
  if (isChecked) {
    seat.push(seatNumber); // Thêm seatNumber vào mảng nếu checkbox được chọn
  } else {
    const index = seat.indexOf(seatNumber);
    if (index !== -1) {
      seat.splice(index, 1); // Loại bỏ seatNumber khỏi mảng nếu checkbox không được chọn
    }
  }
  price_text.forEach(element => {
    element.innerHTML = price * seat.length;
  });
  console.log(seat)
}

const apiUrl = 'http://localhost:9000/coaches/get/getCoach?coach_id=Coach1&trip_id=Trip1';

axios.get(apiUrl)
  .then(response => {
    const tickets = response.data.data;
    console.log(tickets);

    // Function to create and append seat elements
    function createSeatElement(seatNumber, isBooked, isChosen) {
      const label = document.createElement('label');
      label.classList.add('seat-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('seat-checkbox');
      checkbox.disabled = isBooked;
      checkbox.checked = isChosen;
      checkbox.onclick = (e) => {
        selectSeat(e, seatNumber)
      }

      const seatImage = document.createElement('div');
      seatImage.classList.add('seat-image');
      seatImage.style.height = '40px'
      seatImage.style.width = '30px'
      seatImage.style.backgroundSize = '30px'
      seatImage.style.backgroundRepeat = 'no-repeat'
      if (isBooked) {
        seatImage.style.backgroundImage = 'url("/C1SE.11_Front_End/Assets/Customer_FE/image/Content/ListCoach/chair_off.png")';
      } else if (isChosen) {
        seatImage.style.backgroundImage = 'url("/C1SE.11_Front_End/Assets/Customer_FE/image/Content/ListCoach/chair_get.png")';
      } else {
        seatImage.style.backgroundImage = 'url("/C1SE.11_Front_End/Assets/Customer_FE/image/Content/ListCoach/chair_on.png")';
      }

      // http://127.0.0.1:5500/C1SE.11_Front_End/Assets/Customer_FE/image/Content/ListCoach/HoangLong(4).jpg
      label.appendChild(checkbox);
      label.appendChild(seatImage);

      return label;
    }

    // Initialize seat elements on both floors
    const bedUnder = document.getElementById('bedUnder');
    const bedUpper = document.getElementById('bedUpper');

    // Assuming A, B, C, D are your seat categories
    ['A', 'B', 'C', 'D'].forEach(category => {
      for (let i = 1; i <= 6; i++) {
        const seatNumber = category + i;
        const isBooked = tickets.some(ticket => ticket.seat_number === seatNumber);
        // You can add logic to check if the seat is currently chosen
        const isChosen = false;

        const seatElement = createSeatElement(seatNumber, isBooked, isChosen);

        if (category === 'A' || category === 'B') {
          bedUnder.appendChild(seatElement);
        } else {
          bedUpper.appendChild(seatElement);
        }

        // If it's the last seat in the category, add a line break
        if (i === 6) {
          const br = document.createElement('br');
          if (category === 'A' || category === 'B') {
            bedUnder.appendChild(br);
          } else {
            bedUpper.appendChild(br);
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



let trip_id = 'Trip1'
let partner_id = 'Partner1'
let customer_id = 'Customer1'
let coach_id = 'Coach1'
let departure_datetime = '2023-11-06 07:30:00'
let arrival_datetime = '2023-11-07 07:30:00'
let ticket_id_arr = []
// --------------------------Payment----------------------
const nolmalButton = document.querySelector('#next_payment');

// Lấy tham chiếu đến phần tử có lớp là "form_payment"
const formPayment = document.querySelector('.form_payment');

let destination_point = '';
let departure_point = '';
let amount = 0;
const currentDate = new Date();

// Tạo hàm để thêm số '0' vào trước số nếu số đó có một chữ số
const addZero = (number) => (number < 10 ? '0' + number : number);

// Lấy thông tin ngày, tháng, năm, giờ, phút và giây
const year = currentDate.getFullYear();
const month = addZero(currentDate.getMonth() + 1); // Tháng bắt đầu từ 0
const day = addZero(currentDate.getDate());
const hours = addZero(currentDate.getHours());
const minutes = addZero(currentDate.getMinutes());
const seconds = addZero(currentDate.getSeconds());

// Định dạng thành chuỗi "yyyy-mm-dd HH:mm:ss"
const booking_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
const departure_datetime_ = '2023-11-06 15:30:00'


// Gắn sự kiện click cho nút "nolmal"
nolmalButton.addEventListener('click', function () {
  // Hiển thị phần tử "form_payment" khi nút được click
  getTicket()
  const destinationInputs = document.querySelectorAll('input[type="radio"][name="destination"]');
  const departure_pointInputs = document.querySelectorAll('input[type="radio"][name="departure_point"]');
  const departure_datetime__ = document.getElementById('departure_datetime');
  const booking_date_ = document.getElementById('booking_date');
  const amount_ = document.getElementById('amount');
  

  // Duyệt qua từng phần tử radio
  destinationInputs.forEach(input => {
      if (input.checked) {
        destination_point = input.nextElementSibling.textContent.trim();
      }
  });
  departure_pointInputs.forEach(input => {
      if (input.checked) {
        departure_point = input.nextElementSibling.textContent.trim();
      }
  });

  let origin = document.getElementById('origin')
  let destination = document.getElementById('destination')

  origin.value = departure_point;
  destination.value = departure_point;
  departure_datetime__.value  = departure_datetime_
  booking_date_.value = booking_date
  amount_.value = price * seat.length



  
  setTimeout((() => {
    formPayment.style.display = 'flex';
  }), 2000)
});
const payBackButton = document.getElementById('pay_back');

// Gắn sự kiện click cho nút "pay_back"
payBackButton.addEventListener('click', function () {
  // Sử dụng window.history để điều hướng về trang trước
  formPayment.style.display = 'none';
});


async function getTicket() {
  const data = {
    trip_id: trip_id,
    partner_id: partner_id,
    customer_id: customer_id,
    coach_id: coach_id,
    departure_datetime: departure_datetime,
    arrival_datetime: arrival_datetime,
    seat: seat, // Thay thế bằng danh sách ghế bạn muốn đặt
    price: price, // Giá vé
  };

  // Endpoint
  const endpoint = 'http://localhost:9000/ticket/generateTicket';

  // Gửi POST request sử dụng Axios
  await axios.post(endpoint, data)
    .then((response) => {
      console.log('Response from server:', response.data);
      ticket_id_arr = response.data.data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function completed() {
  const data = {
    ticket_id: ticket_id_arr,
    customer_id: customer_id,
    origin: departure_point,
    destination: destination_point,
    departure_datetime: departure_datetime,
    booking_date: booking_date,
    payment_date: booking_date,
    amount: 48.00,
    payment_method: 'Credit Card',
};

// Gửi yêu cầu POST đến API
axios.post('http://localhost:9000/payment/store', data)
    .then(response => {
        if (response.status === 200) {
            const qrImages = response.data.data;

            // Chọn container để hiển thị hình ảnh QR
            const qrContainer = document.getElementById('qr_container');

            // Lặp qua danh sách hình ảnh QR và hiển thị chúng trong container
            qrImages.forEach(qrImageUrl => {
                const qrImage = document.createElement('img');
                qrImage.src = qrImageUrl;

                // Thêm hình ảnh vào container
                qrContainer.appendChild(qrImage);
            });
        } else {
            console.error('Failed to get QR images.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
