

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
const startCameraButton = document.getElementById("startCamera");
const centeredDiv = document.getElementById("centeredDiv");
const closeButton = document.getElementById("closeModal");
const cameraView = document.getElementById("cameraView");
// const video = document.getElementById('cameraView');
var videoSelect = document.querySelector('select#videoSource');

videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log('Available input and output devices:', deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  const videoSource = videoSelect.value;
  const constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  return navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoSelect.selectedIndex = [...videoSelect.options].
    findIndex(option => option.text === stream.getVideoTracks()[0].label);
  cameraView.srcObject = stream;
}

function handleError(error) {
  console.error('Error: ', error);
}

startCameraButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        cameraView.srcObject = stream;
        centeredDiv.style.display = "flex";
        closeButton.addEventListener("click", function () {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            cameraView.srcObject = null;
            centeredDiv.style.display = "none";
        });

        const codeReader = new ZXingBrowser.BrowserQRCodeReader();
        const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId;

        console.log(`Started decode from camera with id ${selectedDeviceId}`);

        const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, cameraView, (result, error, controls) => {
            
            if (result) {
                console.log(result.text);
                if (result.text.toString().includes('http')) {
                    
                    // open url in new tab
                    window.open(result.text);
                    // close camera
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                    cameraView.srcObject = null;
                    centeredDiv.style.display = "none";
                }
            }
        });

    } catch (error) {
        console.error("Không thể truy cập camera:", error);
    }
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
    const apiUrl = 'http://localhost:3000/coaches/Coach1';
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
//Show/hide Modal Notification 
var Bell = document.querySelector('#bell-btn');
var modal = document.querySelector('#myModal')
Bell.addEventListener('click', function () {
    if(modal.style.display === "none" || modal.style.display === "" ) {
        modal.style.display = 'block';
    }
    else {
        modal.style.display = 'none'
    }
})