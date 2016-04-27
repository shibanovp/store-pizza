
angular.module('cart', ['cartService'])
.run(function() {

})
.controller('CartCtrl', function($scope) {
    var ctrl = this;
    this.items = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    this.delete = function ($index) {
        this.items.splice($index,1);
        sessionStorage.cart = JSON.stringify(this.items);
    }
    this.save = function ($index, pizza) {
        this.items[$index] = pizza;
        sessionStorage.cart = JSON.stringify(this.items);
    }
    $scope.$watch(function() { return ctrl.items;}, function() {
        ctrl.total = ctrl.getTotal();
    }, true );
    this.getTotal = function() {
        return this.items.reduce(function(previousValue, currentValue) {
              return previousValue + currentValue.pizza.price * currentValue.quantity;
            }, 0);
    }
})
.directive('pizzaEdit', ['$http','$timeout', function($http, $timeout) {
  return {
    scope: false,
    controller: 'CartCtrl',
    controllerAs: 'ctrl',
    templateUrl: 'partials/pizza-edit.html',
    link: function(scope) {
        $http.get(scope.item.pizza._links.pizzaBase.href).then(function(res) {
        console.log(res);
        scope.item.pizzaBase = res.data;
        return res;
        }).then(function(res) {
        $http.get(res.data._links.pizzas.href).then(function(res) {
            scope.item.pizzas = res.data._embedded.pizza;
        })
        }).then(function() {
            scope.ctrl.save(scope.$index, scope.item)
        });
    }
  }
}]);