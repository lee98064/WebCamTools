import '@babel/polyfill';
const Swal = require('sweetalert2');


class WebCamTools {

    constructor(ele){
        this.ele = document.getElementById(ele) || document.querySelector(ele);
        this.imageCapture;
    }

    start(camid){
        if (navigator.mediaDevices.getUserMedia) {
            var video = this.ele;
            navigator.mediaDevices.getUserMedia({ 
                video: {
                    deviceId: camid
                }
            })
            .then((stream) => {
                video.srcObject = stream;
                const track = stream.getVideoTracks()[0];
                this.imageCapture = new ImageCapture(track);
            })
            .catch(function (err) {
                Swal.fire({
                    title: 'Error!',
                    text: err,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
        }
    }

    async getCameras() {
        let devices = await navigator.mediaDevices.enumerateDevices();
        var camlist = [];
        devices.forEach(function(device) {
            if (device.kind == 'videoinput'){
                camlist[device.deviceId] = device.label
            }
        });
        return camlist;
    }

    async setCamera(cameras){
        const { value: camera } = await Swal.fire({
            title: 'Choose a Camera',
            input: 'select',
            inputOptions: cameras,
            inputPlaceholder: 'Choose a Camera....',
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === '') {
                    resolve('Please choose a camera.')
                } else {
                    resolve()
                }
              })
            }
        })

        if (camera){
            a.start(camera);
        }else{
            Swal.fire({
                title: 'Warning!',
                text: 'Not select a camera!',
                icon: 'warning',
                confirmButtonText: 'Close'
            })
        }

        //   if (camera) {
        //     return camera
        //   }else{
        //     return false
        //   }
    }


    // drawCanvas(canvas, img) {
    //     canvas.width = getComputedStyle(canvas).width.split('px')[0];
    //     canvas.height = getComputedStyle(canvas).height.split('px')[0];
    //     let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
    //     let x = (canvas.width - img.width * ratio) / 2;
    //     let y = (canvas.height - img.height * ratio) / 2;
    //     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //     canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
    //         x, y, img.width * ratio, img.height * ratio);
    // }

    takeSnap(uploadlink){
        // var canvas = document.createElement('canvas');
        // var context = canvas.getContext('2d');
        this.imageCapture.takePhoto()
        .then(blob => {
            // var img = document.querySelector("#takePhotoCanvas");
            var src = URL.createObjectURL(blob);
            Swal.fire({
                title: "Picture",
                html:  "<img id='preview_img' src='" + src + "' style='width:100%;'>",
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Upload`,
            }).then((result) => {
                if (result.isConfirmed) {
                    var link = document.createElement("a");

                    document.body.appendChild(link); 
            
                    link.setAttribute("href", src);
                    link.setAttribute("download", 'Photo' + Date.now());
                    link.click();
                    link.remove();
                }else if (result.isDenied) {
                    var imagefile = this.getDataURL(document.querySelector("#preview_img"));
                    imagefile = imagefile.replace("data:image/jpeg;base64,", "");
                    var oXHR = new XMLHttpRequest();
                    oXHR.open('POST',uploadlink,true);
                    oXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    oXHR.send(JSON.stringify({
                        imageData: imagefile
                    }));
                }
            })
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Close'
            })
        });
    }

    getDataURL(img) {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set width and height
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        // Draw the image
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg');
     }

}

window.WebCamTools = WebCamTools;


// var a = new window.WebCamTools("#webcam");


// document.querySelector('#takephoto').addEventListener('click', function() {
//     a.takeSnap("http://localhost:8080/")
// });

// document.querySelector('#changecam').addEventListener('click', function() {
//     a.getCameras().then(function (cameras) {
//         a.setCamera(cameras);
//     }).catch(function (e) {
//         console.error(e);
//     });
// });

