angular.module('cartService', [])
.factory('cart', ['$rootScope', function($rootScope) {
    var cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    save();
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
     function save() {
        console.warn('saved');
        sessionStorage.cart = JSON.stringify(cart);
        $rootScope.$broadcast('cartChanged');
     }
   }])

    .directive('cartLength',['$rootScope','cart', function($rootScope, cart) {
        return {
            template: '{{ cart }} ${{ total }}',
            link: function(scope) {
                function updateCartInfo() {
                    scope.cart = cart.getList().length;
                    scope.total = cart.getTotal();
                }
                updateCartInfo();
                $rootScope.$on('cartChanged', updateCartInfo);
            }
        }
    }])