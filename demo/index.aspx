<%@ Page Language="VB" AutoEventWireup="false" CodeFile="index.aspx.vb" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Demo</title>
</head>
<body>
    <form id="form1" runat="server">
        <video id="webcam" autoplay></video>
        <button type="button" id="takephoto">拍照</button>
        <button type="button" id="changecam">換相機</button>
        <img id="takePhotoCanvas"></img>
        <script src="./webcamtools.js"></script>
        <script defer>
            //建立相機物件
            var a = new window.WebCamTools("#webcam");


            //按下拍照鈕拍照
            document.querySelector('#takephoto').addEventListener('click', function() {

                //呼叫物件內拍照方法，後面網址是拍照後檔案要上傳的網址
                a.takeSnap("./index.aspx/MoveImages")
            });

            //按下按鈕切換相機
            document.querySelector('#changecam').addEventListener('click', function() {
                //呼叫切換方法
                setCamera()
            });

            //獨立出切換相機方法可以重複使用
            function setCamera(){
                a.getCameras().then(function (cameras) {
                    a.setCamera(cameras);
                }).catch(function (e) {
                    console.error(e);
                });
            }

            //當網頁載入時會跳出選擇相機
            setCamera();
        </script>
    </form>
</body>
</html>
