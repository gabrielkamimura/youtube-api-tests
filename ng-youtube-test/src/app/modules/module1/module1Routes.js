var app = angular.module("suaapp.module1", [])

.config([
    '$routeProvider',
    function($routeProvider) {

        $routeProvider
            .when('/module1', {
                controller: 'ManterModule1Ctrl',
                templateUrl: 'app/modules/module1/partials/list.tpl.html'
            })
        
            .when('/module1/create', {
                controller: 'ManterModule1Ctrl',
                templateUrl: 'app/modules/module1/partials/create.tpl.html'
            })    
        
            .when('/module1/:id', {
                controller: 'ManterModule1Ctrl',
                templateUrl: 'app/modules/module1/partials/view.tpl.html'
            })
            
            .when('/module1/:id/edit', {
                controller: 'ManterModule1Ctrl',
                templateUrl: 'app/modules/module1/partials/create.tpl.html'
            })
    }
]);