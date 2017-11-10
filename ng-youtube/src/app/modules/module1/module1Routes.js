var app = angular.module("suaapp")

.config([
    '$routeProvider',
    function($routeProvider) {

        $routeProvider
            .when('/', {
                redirectTo: '/module1'
            })

            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'app/modules/module1/partials/login.tpl.html'
            })

            .when('/module1', {
                controller: 'InicioCtrl',
                templateUrl: 'app/modules/module1/partials/list.tpl.html'
            })
        
            .when('/module1/create', {
                controller: 'InicioCtrl',
                templateUrl: 'app/modules/module1/partials/create.tpl.html'
            })    
        
            .when('/module1/:id', {
                controller: 'InicioCtrl',
                templateUrl: 'app/modules/module1/partials/view.tpl.html'
            })
            
            .when('/module1/:id/edit', {
                controller: 'InicioCtrl',
                templateUrl: 'app/modules/module1/partials/create.tpl.html'
            })
    }
]);