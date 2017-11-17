// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
	'https://www.googleapis.com/auth/youtube'
];

var usuarioLogado = {};

console.log(OAUTH2_CLIENT_ID);

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
	gapi.auth.init(function() {
		window.setTimeout(checkAuth, 1);
	});
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
	gapi.auth.authorize({
		client_id: OAUTH2_CLIENT_ID,
		scope: OAUTH2_SCOPES,
		immediate: true,
	}, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
		console.log(authResult);
		usuarioLogado = authResult;
		$("#user_key").html(authResult.access_token)
	if (authResult && !authResult.error) {
		// Authorization was successful. Hide authorization prompts and show
		// content that should be visible after authorization succeeds.
		$('.pre-auth').hide();
		$('.post-auth').show();
		loadAPIClientInterfaces();
	} else {
		// Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
		// client flow. The current function is called when that flow completes.
		$('#login-link').click(function() {
			gapi.auth.authorize({
				client_id: OAUTH2_CLIENT_ID,
				scope: OAUTH2_SCOPES,
				immediate: false
				}, handleAuthResult);
		});
	}
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
	gapi.client.load('youtube', 'v3', function() {
//    handleAPILoaded();
			
	});
}

// Monta uma url com base num objeo de parâmetros
function UriUrlParams(baseUri, params) {
    var tmp = {url: baseUri};
    for (var i in params) {
        addParamToUrl(tmp, i, params[i]);
    }
    return tmp.url;
}

function addParamToUrl(url, index, value) {
    if (!isObject(value)) {
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
};

function isObject (item) {
  return (typeof item === "object" && !Array.isArray(item) && item !== null);
}


/**
 * Verifica a situação atual do token e quanto tempo falta pra ele vencer
 */
function refreshToken() {
	console.log("Recarregando token")
	var user_key = usuarioLogado.access_token;

	var obj = {
		refresh_token: user_key,
		client_id: OAUTH2_CLIENT_ID,
		client_secret: 'et7bDKl3xG1ueTEtUz6a8Rh4',
		grant_type: 'refresh_token',
		access_type: 'offline'
	};
	var url = UriUrlParams("https://www.googleapis.com/oauth2/v4/token", obj);

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			usuarioLogado.access_token = JSON.parse(this.responseText).access_token;
			console.log(usuarioLogado);
			console.log(JSON.parse(this.responseText));
		}
	};
	xhttp.open("POST", url, true);
	xhttp.send(JSON.stringify(obj));
}

// Cancela um token
function revokeToken() {
	console.log("Recarregando token")
	var user_key = usuarioLogado.access_token;

	var obj = {
		refresh_token: user_key,
		client_id: OAUTH2_CLIENT_ID,
		client_secret: 'et7bDKl3xG1ueTEtUz6a8Rh4',
		grant_type: 'refresh_token',
		access_type: 'offline'
	};
	var url = "https://accounts.google.com/o/oauth2/revoke?token=" + user_key;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(JSON.parse(this.responseText));
		}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send();
	
}