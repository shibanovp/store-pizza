angular.module('app', ['cartService', 'ngResource', 'spring-data-rest'])
.controller('StoreCtrl', ['$scope','$http', function($scope, $http) {
    var ctrl = this;
    $http.get('pizzabase').then(function(res) {
        if (res.data._embedded != undefined) {

            ctrl.pizzas = res.data._embedded.pizzaBase;
            angular.forEach(ctrl.pizzas, function(pizzaBase) {
                $http.get(pizzaBase._links.pizzas.href).then(function(res) {
                    pizzaBase.pizzas = res.data._embedded.pizza;
                })
            })
        } else {
            ctrl.pizzas = [];
        }
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
            scope.checked = scope.data.pizzas[0];
        });
        scope.add = function() {
            cart.add(scope.checked, 1);
        }
    }
  }
}])
.run(function($http, SpringDataRestAdapter) {
SpringDataRestAdapter.process($http.get('pizzabase'), 'pizzas').then(function (processedResponse) {
     console.log(processedResponse);
});
});
