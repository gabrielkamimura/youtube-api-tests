function enviarVideo() {
    var token = gapi.auth.getToken().access_token;
    var oToken = {"state":"","access_token":"ya29.Glz9BOqGVMNzq_3KvhyIFUHZ5EpQIBpzqoTM7CaV725DcctCzHm5k4zuFeMWsQR2zCXvEeV6OiTEJPdd86n6yuoC5tt6UGALYBP16_8s5OsGFK7254S6fiutxykKlg","token_type":"Bearer","expires_in":"3600","scope":"https://www.googleapis.com/auth/youtube","client_id":"682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com","response_type":"token","issued_at":"1510078973","expires_at":"1510082573","g-oauth-window":{"window":null,"self":null,"location":{},"closed":true,"frames":null,"length":0,"top":null,"opener":null,"parent":null},"status":{"google_logged_in":false,"signed_in":true,"method":"PROMPT"}};
    
    var token = oToken.access_token;
    
    var video = document.getElementById("video-input");
    var file = video.files[0];
    console.log(file)
    var params = {
        part: 'snippet, status',
        resource: {
            snippet: {
                title: 'my video',
                description: 'Description',
                categoryId: "22"
            },
            status: {
                privacyStatus: "private"
            }
        }, file
    }
    console.log(params);
    
    var invocation = new XMLHttpRequest();
    invocation.open('POST', "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet", true);
    invocation.setRequestHeader('Authorization', 'Bearer ' + token);
    invocation.send(file);
    
}