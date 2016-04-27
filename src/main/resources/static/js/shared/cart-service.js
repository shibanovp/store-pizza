angular.module('cartService', [])
.factory('cart', ['$rootScope', function($rootScope) {
    var cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    save();
    return {
        getItems: getItems,
        add: add,
        update: update,
        delete: deleteItem,
        getTotal: getTotal,
        getLength: getLength
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
        angular.forEach(cart, function(item, index) {
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
      save();
     }
     function _isUnique(index, pizza) {
        var newCart = cart.splice();
        return _indexOf(pizza, newCart.splice(index, 1)) < 0;
     }
     function update(index, pizzaBase, pizza, quantity) {
        if (_isUnique(index, pizza)) {
            cart[index] = {
                pizzaBase: pizzaBase,
                pizza: pizza,
                quantity: quantity
            }
            save();
        } else {
            cart.splice(index, 1);
            add(pizzaBase, pizza, quantity);
        }
     }
     function deleteItem(index) {
        console.log(cart);
        cart.splice(index, 1);
        console.log(cart);
        save();
     }
     function getLength() {
        return cart.length;
     }
     function save() {
        sessionStorage.cart = JSON.stringify(cart);
        $rootScope.$broadcast('cartChanged');
     }
   }])

    .directive('cartLength',['$rootScope','cart', function($rootScope, cart) {
        return {
            scope: true,
            template: '{{ cart }} ${{ total }}',
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