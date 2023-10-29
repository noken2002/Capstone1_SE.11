document.addEventListener('click', function(){
    const HideShow = document.getElementById('hideShow')
    const Notice = document.getElementById('notice')

    HideShow.addEventListener('click',function()
    {
        if(Notice.style.display === 'none')
        {
            Notice.style.display = 'grid';
        }
        else
        {
            Notice.style.display = 'none';
        }
    })
});
const startCameraButton = document.getElementById("startCamera");
const centeredDiv = document.getElementById("centeredDiv");
const cameraView = document.getElementById("cameraView");

startCameraButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        cameraView.srcObject = stream;
        centeredDiv.style.display = "flex";
        centeredDiv.addEventListener("click", function() {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            cameraView.srcObject = null;
            centeredDiv.style.display = "none";
        });
    } catch (error) {
        console.error("Không thể truy cập camera:", error);
    }
});