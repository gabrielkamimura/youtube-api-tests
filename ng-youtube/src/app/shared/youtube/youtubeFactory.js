var app = angular.module("suaapp")

.factory(
    'YoutubeFactory', [

        '$http', '$q', 'apiUrl','$timeout',
        function($http, $q, apiUrl, $timeout) {
            // The client ID is obtained from the Google Developers Console
            // at https://console.developers.google.com/.
            // If you run this code from a server other than http://localhost,
            // you need to register your own client ID.
            var OAUTH2_CLIENT_ID = '682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com';
            var OAUTH2_SCOPES = [
              'https://www.googleapis.com/auth/youtube'
            ];

            // Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
            // If the currently logged-in Google Account has previously authorized
            // the client specified as the OAUTH2_CLIENT_ID, then the authorization
            // succeeds with no user intervention. Otherwise, it fails and the
            // user interface that prompts for authorization needs to display.
            function checkAuth() {
              gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: true
              }, handleAuthResult);
            }

            // Handle the result of a gapi.auth.authorize() call.
            function handleAuthResult(authResult) {
                console.log(authResult);
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

            function fileToObject(file) {
                var tmp = {};

                for (var i in file) {
                    tmp[i] = file[i];
                }
                return tmp;
            }

            // Load the client interfaces for the YouTube Analytics and Data APIs, which
            // are required to use the Google APIs JS client. More info is available at
            // http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
            function loadAPIClientInterfaces() {
              gapi.client.load('youtube', 'v3', function() {
            //    handleAPILoaded();
                  
              });
            }

            function toFormData(obj) {
                var form_data = new FormData();
                for ( var key in obj ) {
                    form_data.append(key, obj[key]);
                }

                return form_data;
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
                if (!angular.isObject(value)) {
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

            return {
                login: function() {
                    gapi.auth.init(function(response) {

                        console.log(response);
                    });
                },

                upload: function(video, titulo, descricao) {

                    var d = $q.defer();

                    // var token = "ya29.Glz_BEFFBOVbIjI2hiSfC924MaENQ9NI607FFS8D3_tUox-f_n0GOky9z9BVDl8lqfWwt9hPI4PwOZpgcK6sZ3o6t87lUR7Ch23AI9AtaIyvJ0OmIb0jU_880_7OHA"
                    // var token = "AIzaSyColSrZ_eE3UaG9CGPbLxOjak-relV3rfM";
                    // var token = "682239625401-0t5tl7jf7tkd7ehcid0d3skiknomvaec.apps.googleusercontent.com"
                    // var token = "et7bDKl3xG1ueTEtUz6a8Rh4";
                    var token = "ya29.GlsDBUh-eFlgdmmxyU3ke-nS-8-GF7U5Yp4mPZos268xofRt7UnUqJEqm2KTtV2zHI_-e0gOo8uWqEdgQOfoAwcMO7VC2y8HjhJwll7aN5-m8Wwroz6rO9EUS_e-";

                    var file = video[0];

        
                    var dados = {
                        part: 'snippet,status',
                        resource: {
                            snippet: {
                                title: titulo,
                                description: descricao,
                                categoryId: "22"
                            },
                            status: {
                                privacyStatus: "private"
                            }
                        }
                    }

                    $http({ method: 'POST',
                            url: UriUrlParams('https://www.googleapis.com/upload/youtube/v3/videos', dados),
                            headers: {
                                        'Authorization': 'Bearer ' + token,
                                        'Content-type': 'video/*'
                                    },
                            data: file,
                        }).success(function(response) {
                            d.resolve(response);
                        }).error(function(response) {
                            d.reject(response.error);
                        });

                    return d.promise;
                }
            }
        }
    ]
)

.directive("filesInput", function() {
  return {
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
})