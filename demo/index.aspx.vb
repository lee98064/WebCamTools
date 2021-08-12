Imports System.Web.Services
Imports System.IO
Partial Class index
    Inherits System.Web.UI.Page

    <WebMethod(EnableSession:=True)>
    Public Shared Sub MoveImages(ByVal filename As String, ByVal filedesc As String, ByVal imageData As String)
        '檔案名稱須包含副檔名
        filename = "Photo_" & filename & ".jpeg"
        '儲存路徑，可自行修改，可使用相對路徑或使用那個可以取得當前網頁路徑的那個函數，但我忘記是啥了:D
        Dim pathstring As String = "D:\"
        Dim destFile As String = Path.Combine(pathstring)
        Dim destFile1 As String = Path.Combine(destFile, filename)
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
