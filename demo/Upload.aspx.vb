Imports System.Web.Services
Imports System.IO
Imports System.Data.SqlClient
Imports System.Data
Partial Class Upload
    Inherits System.Web.UI.Page
    ' 因為js限制不能使用webform方式上傳，需使用ajax，那回傳過來的是一個json字串，asp會自動將變數對應進imageData
    ' 這部分已經整合進js，所以只需處理asp部分就好
    '回傳樣式:
    ' {
    '     imageData: "BASE64編碼"
    ' }
    '參考網址:https://www.aspforums.net/Threads/102983/Pass-Send-Image-data-as-BASE64-string-using-jQuery-AJAX-in-ASPNet/

    '此句必加，防止引發CSRF或相關登入驗證錯誤

    <WebMethod(EnableSession:=True)>
    Public Shared Sub MoveImages(ByVal imageData As String)
        '檔案名稱須包含副檔名
        Dim fileName As String = DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") & ".jpeg"
        '儲存路徑，可自行修改，可使用相對路徑或使用那個可以取得當前網頁路徑的那個函數，但我忘記是啥了:D
        Dim pathstring As String = "D:\"
        Dim destFile As String = Path.Combine(pathstring)
        Dim destFile1 As String = Path.Combine(destFile, fileName)
        '檢查是否有相同檔名，有就刪除舊的，這邊可以客製化作法
        If File.Exists(destFile1) Then
            File.Delete(destFile1)
        End If
        '使用FileStream將Base64轉成圖片檔案
        Using fs As FileStream = New FileStream(destFile1, FileMode.Create)
            Using bw As BinaryWriter = New BinaryWriter(fs)
                Dim bytes As Byte() = Convert.FromBase64String(imageData)
                bw.Write(bytes, 0, bytes.Length)
                bw.Close()
            End Using
        End Using
    End Sub
    
End Class
