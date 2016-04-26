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
angular.module('cart', [])
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
    templateUrl: 'partials/pizza-edit.html',
    link: function(scope) {
        $http.get(scope.item.pizza._links.pizzaBase.href).then(function(res) {
        scope.item.pizzaBase = res.data;
        return res;
        }).then(function(res) {
        $http.get(res.data._links.pizzas.href).then(function(res) {
            scope.item.pizzas = res.data._embedded.pizza;
        })
        });
    }
  }
}]);
angular.module('checkout', [])
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
}])