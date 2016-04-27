angular.module('checkout', ['cartService'])
.run(function() {
    console.log('checkout runs');
})
.controller('CheckoutCtrl', ['$scope', '$http', function($scope, $http) {
    var ctrl = this;
    ctrl.method = 'cash';
    ctrl.items = JSON.parse(sessionStorage.cart);
    ctrl.total = ctrl.items.reduce(function(previousValue, currentValue) {
       return previousValue + currentValue.pizza.price * currentValue.quantity;
     }, 0);
    console.log(ctrl.items);
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
}]);