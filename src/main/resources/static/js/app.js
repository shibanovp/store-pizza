angular.module('app', [])
.run(function() {

})
.directive('pizza', ['cart', function(cart) {
  return {
    scope: {
      data: '='
    },
    templateUrl: 'partials/pizza.html',
    link: function(scope) {
        scope.checked = scope.data[1] || scope.data[0];
        scope.add = function() {
            cart.add(scope.checked);
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
    var cart = [];
    return {
        getList: getList,
        add: add,
        getCart: getCart,
        getTotal: getTotal
    }
    function getTotal() {
    return cart.reduce(function(previousValue, currentValue, currentIndex, array) {
      return previousValue + currentValue.price;
    }, 0);
    }
    function getCart() {
        return cart;
    }
    function getList() {
        return cart;
     };
     function add(checked) {
      cart.push(checked);
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
.controller('CartCtrl', function() {
    this.items = JSON.parse(sessionStorage.cart);
    this.delete = function ($index) {
        this.items.splice($index,1);
        sessionStorage.cart = JSON.stringify(this.items);
    }
    console.warn('cart is here', this.items);
})
