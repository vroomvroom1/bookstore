
//Organizing routes
myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
  console.log('BooksController loaded');
//here
  $scope.getBooks = function(){
    $http.get('/books').then(function(response){
      $scope.books = response.data;
    });
  }

  $scope.getBook = function(){
    let id = $routeParams.id;
    $http.get('/books/'+id).then(function(response){
      $scope.book = response.data;
    });
  }

  $scope.addBook = function(){
      console.log($scope.book);
  		$http.post('/books/', $scope.book).then(function(response){
  			window.location.href='#!/books';
  		});
  	}

  $scope.updateBook = function(){
    let id = $routeParams.id;
    $http.put('/books/'+id, $scope.book).then(function(response){
      window.location.href='#!/books';
    });
  }

  $scope.removeBook = function(id){
    $http.delete('/books/'+id).then(function(response){
      window.location.href='#!/books';
    });
  }
}]);
