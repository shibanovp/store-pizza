angular.module('app', ['cartService', 'ngResource', 'spring-data-rest'])
.controller('StoreCtrl', ['$scope','StorePizzaBases', function($scope, StorePizzaBases) {
    var ctrl = this;
    StorePizzaBases.then(function success(pizzaBases) {
        ctrl.pizzas = pizzaBases || [];
    }).catch(function error() {
        ctrl.pizzas = [];
    });
}])
.directive('pizza', ['cart','$timeout', function(cart, $timeout) {
  return {
    scope: {
      data: '='
    },
    templateUrl: 'partials/pizza.html',
    link: function(scope) {
        $timeout(function() {
            scope.checked = scope.data.pizzas._embeddedItems[0];
        });
        scope.add = function() {
            cart.add(scope.checked, 1);
        }
    }
  }
}])
.factory('StorePizzaBases', ['$http', 'SpringDataRestAdapter', function($http, SpringDataRestAdapter) {
    return SpringDataRestAdapter.process($http.get('pizzabase'), 'pizzas').then(function successfullyFetched(processedResponse) {
        return processedResponse._embeddedItems;
    });
}]);
