document.addEventListener('click', function () {
  const HideShow = document.getElementById('hideShow');
  const Notice = document.getElementById('notice');

  HideShow.addEventListener('click', function () {
    if (Notice.style.display === 'none') {
      Notice.style.display = 'grid';
    } else {
      Notice.style.display = 'none';
    }
  });
});

let seatsData = [];
let currentFloor = 1;

function displaySeatData(data) {
  const seatsContainer = document.querySelector('.content .Bus .Seats');
  seatsContainer.innerHTML = '';
  data.forEach((e) => {
    const seatElement = document.createElement('div');
    seatElement.className = `Seat${e.seat_status}`;
    seatElement.textContent = e.seat_number;
    seatsContainer.appendChild(seatElement);
  });
}

function getStatusSeatNumber(seatData, setNumber) {
  console.log('seatData,setNumber', setNumber);
  return seatData.find((e) => {
    return e.seat_number == setNumber;
  });
}

function fetchSeatStatusData(decker) {
  const apiUrl = 'http://localhost:9000/coaches/Coach1/seats?decker=' + decker;
  const seatsContainer = document.querySelector('.content .Bus .Seats');
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      seatsData = data.data ? data.data : [];
      displaySeatData(seatsData);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
      seatsData = [];
    });
}

function init() {
  fetchSeatStatusData(currentFloor);
  setInterval(() => {
    fetchSeatStatusData(currentFloor);
  }, 3000);
}

window.onload = init;

const floor1Button = document.getElementById('searFoor1');
const floor2Button = document.getElementById('searFoor2');

// Event listener for floor 1 button
floor1Button.addEventListener('click', function () {
  currentFloor = 1;
  fetchSeatStatusData(currentFloor);
  floor1Button.classList.add('active');
  floor2Button.classList.remove('active');
});

// Event listener for floor 2 button
floor2Button.addEventListener('click', function () {
  currentFloor = 2;
  fetchSeatStatusData(currentFloor);
  floor2Button.classList.add('active');
  floor1Button.classList.remove('active');
});
//Show/hide Modal Notification
var Bell = document.querySelector('#bell-btn');
var modal = document.querySelector('#myModal');
Bell.addEventListener('click', function () {
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
});
