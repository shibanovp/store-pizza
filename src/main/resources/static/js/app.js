angular.module('app', ['cartService', 'ngResource', 'spring-data-rest'])
.controller('StoreCtrl', ['StorePizzaBases', function(StorePizzaBases) {
    var ctrl = this;
    StorePizzaBases.then(function success(pizzaBases) {
        ctrl.pizzaBases = pizzaBases || [];
    }).catch(function error() {
        ctrl.pizzaBases = [];
    });
}])
.directive('pizzaList', ['cart', function(cart) {
    return {
        templateUrl: 'partials/pizza-list.html',
        controller: 'StoreCtrl',
        controllerAs: 'store',
        replace: true
    }
}])
.directive('pizza', ['cart','$timeout', function(cart, $timeout) {
  return {
    scope: {
      pizzaBase: '='
    },
    controller: 'StoreCtrl',
    controllerAs: 'store',
    replace: true,
    templateUrl: 'partials/pizza.html',
    link: function(scope) {
        scope.pizza = scope.pizzaBase.pizzas._embeddedItems[0];
        scope.addToCart = function() {
            cart.add(scope.pizzaBase, scope.pizza, 1);
        }
    }
  }
}])
.factory('StorePizzaBases', ['$http', 'SpringDataRestAdapter', function($http, SpringDataRestAdapter) {
    return SpringDataRestAdapter.process($http.get('pizzabase'), 'pizzas').then(function successfullyFetched(processedResponse) {
        return processedResponse._embeddedItems;
    });
}]);
