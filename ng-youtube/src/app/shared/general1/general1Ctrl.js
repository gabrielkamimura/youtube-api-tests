var app = angular.module("suaapp")

/**
 * Uma diretiva base para fazer outras
 */
.directive(
    'general1',
    [
        function() {

            return {
                restrict: 'EA',

                controller: 'General1Ctrl',

                scope: {
                    card: '=',
                    ocultarBotoes: '=?'
                },

                templateUrl: 'app/shared/general1/partials/general1.tpl.html'
            };
        }
    ]
)
.controller("General1Ctrl", ['$scope', '$routeParams', function() {
    
}])

