angular.module('app', [])
.run(function() {

})
.directive('pizza', function() {
  return {
    scope: {
      data: '='
    },
    templateUrl: 'partials/pizza.html',
    link: function(scope) {
        scope.checked = scope.data[1] || scope.data[0];
        console.log('Hello pizza', scope.data);
    }
  }
});
