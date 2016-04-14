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
      otherwise({
        redirectTo: '/'
      });
  }])