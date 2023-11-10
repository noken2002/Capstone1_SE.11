

document.addEventListener('click', function () {
    const HideShow = document.getElementById('hideShow')
    const Notice = document.getElementById('notice')

    HideShow.addEventListener('click',function()
    {
        if(Notice.style.display === 'none')
        {
            Notice.style.display = 'grid';
        }
        else {
            Notice.style.display = 'none';
        }
    })
});



let  seatsData= [];

function displayDataFloor1(data) {
    console.log("dataaaaa",data)
    const seatsContainer = document.querySelector('.content .Bus .Seats');
    seatsContainer.innerHTML = '';
    for(let i=1; i< 7; i++){
      ["A","B","C"].forEach(e=> {
            const seatElement = document.createElement('div');
            seatElement.className = getStatusSeatNumber(data,e+i) ? 'Seat2' : 'Seat3' ;
            seatElement.textContent = e+i; 
            seatsContainer.appendChild(seatElement);
    })}}
    
function displayDataFloor2(data) {
         console.log("datadadadadaaa",data)
        const seatsContainer = document.querySelector('.content .Bus .Seats');
        seatsContainer.innerHTML = '';
        for(let i=1; i< 7; i++){
            ["D","E","F"].forEach(e=> {
         
            const seatElement = document.createElement('div');
            seatElement.className = getStatusSeatNumber(data,e+i) ? 'Seat2' : 'Seat3' ;
            seatElement.textContent = e+i; 
            seatsContainer.appendChild(seatElement);
        })}
    }

    function getStatusSeatNumber(seatData,setNumber){
      console.log("seatData,setNumber",setNumber)
        return seatData.find(e=>{
        return e.seat_number == setNumber
    })

}

function fetchSeatStatusData() {
    const apiUrl = 'http://localhost:9000/coaches/Coach1';
    const seatsContainer = document.querySelector('.content .Bus .Seats');
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("dataaaaaaaaaaaaaaaaa",data);
        seatsData = data.data ? data.data : [];
        displayDataFloor1(seatsData);
      
    })
    .catch(err => {
        console.error('Error fetching data:', err);
        seatsData = []
    });
}


function init() {
    fetchSeatStatusData();
    displayDataFloor1(seatsData);
}

window.onload = init;

const floor1Button = document.getElementById('searFoor1');
const floor2Button = document.getElementById('searFoor2');

// Event listener for floor 1 button
floor1Button.addEventListener('click', function() {
    displayDataFloor1(seatsData);
    floor1Button.classList.add('active');
    floor2Button.classList.remove('active');
});

// Event listener for floor 2 button
floor2Button.addEventListener('click', function() {
    displayDataFloor2(seatsData)
    floor2Button.classList.add('active');
    floor1Button.classList.remove('active');
});
