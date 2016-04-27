angular.module('checkout', ['cartService'])
.controller('CheckoutCtrl', ['$scope', '$http', 'cart', function($scope, $http, cart) {
    var ctrl = this;
    ctrl.method = 'cash';
    ctrl.items = cart.getItems();
    ctrl.total = cart.getTotal();
    ctrl.confirm = function() {
        $http.post('bill', {}).then(function(res) {
            return res.data._links.self.href;
        }).then(function (billUri) {
            angular.forEach(ctrl.items, function(item) {
            pizzaUri = item.pizza._links.self.href;
                $http.post('billpizza', {
                    bill: billUri,
                    pizza: pizzaUri,
                    quantity: item.quantity
                })
            })
            return billUri;
        }).then(function(billUri) {
            if (ctrl.method == 'card') {
                $http.post('cardpayment', {
                    bill: billUri,
                    number: ctrl.number,
                    name: ctrl.name,
                    validm: ctrl.validm,
                    validy: ctrl.validy,
                    ccv: ctrl.ccv
                })
            }
            delete sessionStorage.cart
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
;