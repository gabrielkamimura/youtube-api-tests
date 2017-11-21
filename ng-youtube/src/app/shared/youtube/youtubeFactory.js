var app = angular.module("suaapp")

.factory(
    'YoutubeFactory', [

        '$http', '$q', 'apiUrl','$timeout',
        function($http, $q, apiUrl, $timeout) {
            var OAUTH2_CLIENT_ID = '682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com';
            var OAUTH2_SCOPES = [
              'https://www.googleapis.com/auth/youtube'
            ];
            
          /**
           * Verifica a situação atual do token e quanto tempo falta pra ele vencer
           */
           function getToken() {
               var d = $q.defer();
             var refreshToken = "1/Y36o3Qt8CB4PA6sjYTLAhvGUOfDPKtjjJraAwAJmm5g";
             console.log("Recarregando token")

             var obj = {
               refresh_token: refreshToken,
               client_id: OAUTH2_CLIENT_ID,
               client_secret: 'et7bDKl3xG1ueTEtUz6a8Rh4',
               grant_type: 'refresh_token',
               access_type: 'offline'
             };
             var url = UriUrlParams("https://www.googleapis.com/oauth2/v4/token", obj);
               $http.post(url, obj)
                .success(function(user) {
                   d.resolve(user);
                }).error(function(error) {
                   d.reject(error);
               });
               
               return d.promise;
           }
            
            function fileToObject(file) {
                var tmp = {};

                for (var i in file) {
                    tmp[i] = file[i];
                }
                return tmp;
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
                    getToken().then(function(user) {
                        var token = user.access_token;
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
                        
                    })


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