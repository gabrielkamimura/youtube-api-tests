var app = angular.module("suaapp.module1")

.service(
    'Module1Service', [
        '$http', '$q', 'apiUrl',
        function($http, $q, apiUrl) {

            var url = apiUrl + '/module1';

            return {
                
                /**
                 * Obtém todos os module1
                 * @returns {Promise} 
                 */
                getAll: function() {
                    var d = $q.defer();

                    $http.get(url)
                        .success(function(response) {
                            d.resolve(response);
                        })
                        .error(function(msg) {
                            d.reject(msg);
                        });

                    return d.promise;
                },
                
                /**
                 * Obtém um module1 por id
                 * @param   {number}  id 
                 * @returns {Promise} 
                 */
                getById: function(id) {
                    var d = $q.defer();

                    $http.get(url + '/' + id)
                        .success(function(response) {
                            d.resolve(response);
                        })
                        .error(function(msg) {
                            d.reject(msg);
                        });

                    return d.promise;
                },

                /**
                 * Atualiza um module1
                 * @param   {object}  obj 
                 * @returns {Promise} 
                 */
                update: function(obj) {
                    var d = $q.defer(),
                        url = apiUrl + '/' + obj.id,
                        tmp = {};

                    $http.put(
                            url,
                            tmp
                        )
                        .success(function(response) {
                            d.resolve(response);
                        })
                        .error(function(msg) {
                            d.reject(msg);
                        });
                    return d.promise;
                },

                /**
                 * Cria um module 1
                 * @param   {object}  obj 
                 * @returns {Promise} 
                 */
                create: function(obj) {
                    var d = $q.defer();

                    $http.put(url, obj)
                        .success(function(response) {
                            d.resolve(response);
                        })
                        .error(function(msg) {
                            d.reject(msg);
                        });

                    return d.promise;
                },
        
            }
        }
    ]
)