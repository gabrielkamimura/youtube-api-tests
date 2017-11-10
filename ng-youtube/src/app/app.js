'use strict';

var m = angular.module('suaapp', [
    // Dependências internas
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'ngMessages',
    // 'YouTube',
])


.directive("mAppLoading", ['$animate', 
    function($animate ) {            
        return({
            link: link,
            restrict: "C"
        });        
        function link( scope, element, attributes ) {            
            $(element).fadeOut(1000);        
        }
    }])

.controller(
    'SuaAppCtrl', [
        '$rootScope','$scope', '$routeParams', '$location', '$cookies', '$animate', '$sce',
        function($rootScope, $scope, $routeParams, $location, $cookies, $animate, $sce) {
            
            /*
             Aqui devem vir funções genéricas, utilizáveis em toda a aplicação. Por exemplo, formatadores de endereço, links de navegação
            */
            
            $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
                $(".conteudo-principal").animate({ scrollTop: 0 }, 200); 
            });

            /**
             * Recebe uma string e retorna-a após substituir todas as ocorrências de determinada expressão por outra
             * @param   {String} [string=""] String a ser alterada
             * @param   {String} token       Expressão a ser buscada
             * @param   {String} newtoken    Expressão a substituir
             * @returns {String} Expressão com as devidas substituições
             */
            $rootScope.replaceAll = function(string, token, newtoken) {
                var string = string || "";
                while (string.indexOf(token) != -1) {
                    string = string.replace(token, newtoken);
                }
                return string;
            };

            /**
             * Marca determinado HTML como confiável
             * @param   {String} elem Elemento HTML a ser marcado
             * @returns {String} Elemento HTML agora confiável
             */
            $rootScope.confiarHTML = function(elem) {
                return $sce.trustAsHtml(elem);
            };

            /**
             * Marca determinada url como confiável para adicionar
             * @param   {String} rota
             * @returns {String}
             */
            $rootScope.confiarURL = function(rota) {
                return $sce.trustAsUrl(rota);
            };

            /**
             * Volta para a página anterior
             */
            $rootScope.voltarPagina = function() {
                if (history.length > 1) {
                    if (window.location.href.indexOf('erro') == -1) {
                        window.history.go(-1);
                    } else {
                        window.history.go(-2);
                    }

                } else {
                    return false;
                }
            };


        }
    ]
)

.filter('isArray', function() {
  return function (input) {
    return angular.isArray(input);
  };
})

.filter('isString', function() {
  return function (input) {
    return angular.isString(input);
  };
});