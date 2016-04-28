angular.module('cartService', [])
.factory('cart', ['$rootScope', function($rootScope) {
    var cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    _save();
    return {
        getItems: getItems,
        add: add,
        update: update,
        delete: deleteItem,
        getTotal: getTotal,
        getLength: getLength,
        isEmpty: isEmpty,
        clear: clear
    }
    function getTotal() {
        return cart.reduce(function(previousValue, currentValue) {
          return previousValue + currentValue.pizza.price * currentValue.quantity;
        }, 0);
    }
    function getItems() {
        return cart;
    }
    function _indexOf(pizza, cartArray) {
        cartArray = cartArray || cart;
        var result = -1;
        angular.forEach(cartArray, function(item, index) {
            if (angular.equals(pizza, item.pizza)) {
                result = index;
            }
        });
        return result;
    }
    function add(pizzaBase, pizza, quantity) {
      var index = _indexOf(pizza);
      if (index >= 0) {
          cart[index].quantity += quantity;
      } else {
          cart.push({
              pizzaBase: pizzaBase,
              pizza: pizza,
              quantity: quantity
          });
      }
      _save();
     }
     function _isUnique(index, pizza) {
        var newCart = angular.copy(cart);
        newCart.splice(index, 1);
        return _indexOf(pizza, newCart) < 0;
     }
     function update(index, pizzaBase, pizza, quantity) {
        if (_isUnique(index, pizza)) {
            cart[index] = {
                pizzaBase: pizzaBase,
                pizza: pizza,
                quantity: quantity
            }
            _save();
        } else {
            cart.splice(index, 1);
            add(pizzaBase, pizza, quantity);
        }
     }
     function deleteItem(index) {
        cart.splice(index, 1);
        _save();
     }
     function getLength() {
        return cart.length;
     }
     function _save() {
        sessionStorage.cart = JSON.stringify(cart);
        $rootScope.$broadcast('cartChanged');
     }
     function isEmpty() {
        return cart.length === 0;
     }
     function clear() {
        cart = [];
        _save();
     }
   }])

    .directive('cartInfo',['$rootScope','cart', function($rootScope, cart) {
        return {
            scope: true,
            template: '<span ng-show="cart > 0">{{ cart }} ${{ total | number:2 }}</span>',
            link: function(scope) {
                function updateCartInfo() {
                    scope.cart = cart.getLength();
                    scope.total = cart.getTotal();
                }
                updateCartInfo();
                $rootScope.$on('cartChanged', updateCartInfo);
            }
        }
    }])