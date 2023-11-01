console.log("load js")

var url = new URL(window.location.href);

// Lấy giá trị của tham số 'id'
var id = url.searchParams.get("id");

console.log(id);

// Lấy các phần tử HTML
const fmave = document.getElementById("fmave");
const fname = document.getElementById("fname");
const fsdt = document.getElementById("fsdt");
const lpartner = document.getElementById("lpartner");
const lngaydat = document.getElementById("lngaydat");
const lgiuongso = document.getElementById("lgiuongso");
const lgiave = document.getElementById("lgiave");
const ltinhtrangve = document.getElementById("ltinhtrangve");

// Lấy id từ URL
const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get("id");

// Gửi yêu cầu GET đến API
axios.get(`http://localhost:9000/ticket/getTicket/${ticketId}`)
  .then(response => {
    const data = response.data.data.recordset[0];
    if (data) {
      fmave.value = data.ticket_id;
      fname.value = data.customer_name;
      fsdt.value = data.customer_name;
      lpartner.value = data.partner_name;
      lngaydat.value = data.departure_datetime;
      lgiuongso.value = data.seat_number;
      lgiave.value = data.price;
      ltinhtrangve.value = data.status_ ? "Đã xuất vé" : "Chưa xuất vé";
    } else {
      // Xử lý trường hợp không tìm thấy vé
      alert("Không tìm thấy vé xe với mã vé này.");
    }
  })
  .catch(error => {
    console.error("Lỗi khi gửi yêu cầu API: ", error);
  });
