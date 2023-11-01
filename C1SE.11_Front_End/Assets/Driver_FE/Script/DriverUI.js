

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