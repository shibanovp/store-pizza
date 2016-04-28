angular.module('checkout', ['cartService'])
.controller('CheckoutCtrl', ['$scope', '$window', 'cart','confirmOrder', function($scope, $window, cart, confirmOrder) {
    var ctrl = this;
    ctrl.method = 'cash';
    function syncCart() {
        ctrl.items = cart.getItems();
        ctrl.total = cart.getTotal();
    }
    syncCart();
    $scope.$on('cartChanged', syncCart)
    ctrl.confirm = function() {
        var bill = {};
        confirmOrder(this.items, bill, ctrl.method, ctrl.cardpayment).then(function(billUri) {
            console.warn(billUri);
//            $window.location.href = '/';
        });
    }
}])
.factory('confirmOrder', ['$http', 'cart',function($http, cart) {
    return function(items, bill, method, cardpayment) {
    console.log(items, bill, method, cardpayment);
        return $http.post('bill', {}).then(function(res) {
            return res.data._links.self.href;
        }).then(function (billUri) {
            angular.forEach(items, function(item) {
            pizzaUri = item.pizza._links.self.href;
                $http.post('billpizza', {
                    bill: billUri,
                    pizza: pizzaUri,
                    quantity: item.quantity
                })
            })
            return billUri;
        }).then(function(billUri) {
            if (method == 'card') {
                cardpayment.bill = billUri;
                $http.post('cardpayment', cardpayment);
            }
            cart.clear();
            return billUri;
        })
    }
}])
.directive('cartList', [function() {
  return {
    replace: true,
    templateUrl: 'partials/cart-list.html'
  }
}])
.directive('cartItem', [function() {
  return {
    replace: true,
    templateUrl: 'partials/cart-item.html'
  }
}])
.directive('checkoutForm', [function() {
    return {
        replace: true,
        templateUrl: 'partials/checkout-form.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout'
    }
}]);
