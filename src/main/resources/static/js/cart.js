angular.module('cart', ['cartService'])
.controller('CartCtrl', ['$scope', 'cart', function($scope, cart) {
    var ctrl = this;
    ctrl.items = cart.getItems();
    ctrl.update = function($index) {
        var item = ctrl.items[$index];
        cart.update($index, item.pizzaBase, item.pizza, item.quantity);
    }
    ctrl.delete = function($index) {
        cart.delete($index);
    }
    $scope.$watch(function() { return ctrl.items;}, function() {
        ctrl.total = cart.getTotal();
    }, true );
}])
.directive('cartListEdit', [function() {
    return {
        controller: 'CartCtrl',
        controllerAs: 'cart',
        templateUrl: 'partials/cart-list-edit.html',
        replace: true
    }
}])
.directive('cartItemEdit', [function() {
  return {
    scope: false,
    replace: true,
    controller: 'CartCtrl',
    controllerAs: 'cart',
    templateUrl: 'partials/cart-item-edit.html'
  }
}]);