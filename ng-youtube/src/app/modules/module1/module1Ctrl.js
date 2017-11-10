var app = angular.module("suaapp")

.controller("InicioCtrl", ['$scope', '$routeParams', 'YoutubeFactory', function($scope, $routeParams, YoutubeFactory) {
    $scope.enviarVideo = function(video, titulo, descricao) {
        $scope.carregando = true;
        YoutubeFactory.upload(video, titulo, descricao)
            .then(function(response) {
                $scope.mensagem = {tipo: 'sucesso', texto: "Vídeo enviado"};
            }).catch(function(response) {
                console.error(response);
                $scope.mensagem = {tipo: 'erro', texto: response};
            }).finally(function() {
                $scope.carregando = false;
            });
    }
}])

.controller("LoginCtrl", ['$scope', '$routeParams', 'YoutubeFactory', function($scope, $routeParams, YouTubeFactory) {
    $scope.logar = function() {
        YouTubeFactory.login();
    }
}])