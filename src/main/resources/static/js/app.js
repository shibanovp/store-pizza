angular.module('app', [])
.run(function() {

})
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
.directive('cartLength',['$rootScope','cart', function($rootScope, cart) {
    return {
        template: '{{ cart }} ${{ total }}',
        link: function(scope) {
            scope.cart = cart.getList().length;
            $rootScope.$on('cartChanged', function(v) {
                scope.cart = cart.getList().length;
                scope.total = cart.getTotal();
            });
        }
    }
}])
 .factory('cart', ['$timeout','$rootScope', function($timeout, $rootScope) {
    var cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    return {
        getList: getList,
        add: add,
        getCart: getCart,
        getTotal: getTotal
    }
    function getTotal() {
    return cart.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue.pizza.price * currentValue.quantity;
    }, 0);
    }
    function getCart() {
        return cart;
    }
    function getList() {
        return cart;
     };
     function add(pizza, quantity) {
      cart.push({
          pizza: pizza,
          quantity: quantity
      });
      $rootScope.$broadcast('cartChanged');
      sessionStorage.cart = JSON.stringify(cart);
     }
     function getLength() {
        return cart.length;
     }
   }]);
