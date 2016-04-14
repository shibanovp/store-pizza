var storeApp = angular.module('store', [
  'ngRoute'
])
.controller('StoreCtrl', function($scope) {
	$scope.greeting = {id: 'xxx', content: 'Hello World!'}
})
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/cart', {
        templateUrl: 'partials/cart.html',
      }).
      when('/confirm', {
          templateUrl: 'partials/confirm.html',
        }).
      otherwise({
        redirectTo: '/'
      });
  }])