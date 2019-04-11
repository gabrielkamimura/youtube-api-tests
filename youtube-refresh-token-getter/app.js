class TokenGeneratorCtrl {
    
    constructor(OAUTH2_CLIENT_ID = '',
                CLIENT_SECRET = '') {
        this.OAUTH2_CLIENT_ID = OAUTH2_CLIENT_ID;
        this.CLIENT_SECRET = CLIENT_SECRET;
        
        this.start();
    }
    
    start() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.OAUTH2_CLIENT_ID,
                // Scopes to request in addition to 'profile' and 'email'
                scope: 'https://www.googleapis.com/auth/youtube',
                options: {
                    access_type: 'offline',
                    approval_prompt: 'force'

                }
            });
        });
    }
    
    login() {
        let self = this;
        this.auth2.grantOfflineAccess().then(function(r) { self.signInCallback(r) });
    }
    
    insertInView(code) {
        document.querySelector('#campoCode').innerHTML = code;
    }
    
    getTokenByCode(code) {
        console.log("Recarregando token")
        let self = this;

        var obj = {
            code: code,
            client_id: this.OAUTH2_CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            grant_type: 'authorization_code',
            access_type: 'offline',
            approval_prompt: 'force',
            redirect_uri: 'http://localhost:8081'
        };
        
        var url = TokenHelper.UriUrlParams("https://www.googleapis.com/oauth2/v4/token", obj);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText));
                self.insertInView(this.responseText);
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhttp.send(JSON.stringify(obj));

    }
    
    signInCallback(authResult) {
        var self = this;
        console.log(this);
        if (authResult['code']) {

            // Hide the sign-in button now that the user is authorized, for example:
            $('#signinButton').attr('style', 'display: none');
            console.log(authResult);
            self.getTokenByCode(authResult['code']);
        } else {
            alert("Error")
        }
    }

    /**
     * Verifica a situação atual do token e quanto tempo falta pra ele vencer
     */
    refreshToken() {
        var user = JSON.parse(localStorage.getItem('GUser'));
        console.log("Recarregando token")

        var obj = {
            refresh_token: user.refresh_token,
            client_id: this.OAUTH2_CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            grant_type: 'refresh_token',
            access_type: 'offline'
        };
        var url = TokenHelper.UriUrlParams("https://www.googleapis.com/oauth2/v4/token", obj);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText));
            }
        };
        xhttp.open("POST", url, true);
        xhttp.send(JSON.stringify(obj));
    }
    
}

class TokenHelper {
    
    static UriUrlParams(baseUri, params) {
        var tmp = {
            url: baseUri
        };
        for (var i in params) {
            this.addParamToUrl(tmp, i, params[i]);
        }
        return tmp.url;
    }

    static addParamToUrl(url, index, value) {
        if (!this.isObject(value)) {
            if (url.url.indexOf('?') == -1) {
                url.url += '?' + index + '=' + value;
            } else {
                url.url += '&' + index + '=' + value;
            }
        } else {
            for (var i in value) {
                addParamToUrl(url, index + '.' + i, value[i]);
            }
        }
    }

    static isObject(item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }
}