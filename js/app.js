var testApp = angular.module('testApp', ['ngRoute']);

testApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainCtrl'
        })
        .when('/article/:categiry_id', {
            templateUrl : 'views/article.html',
            controller  : 'articleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

testApp.controller('mainCtrl', function($scope, $http) {
    $http.get('data/response.json').success(function(response){
        $scope.data = response;
    })
});

testApp.controller('articleCtrl', function($scope, $http, $routeParams) {
    $scope.categiry_id = $routeParams.categiry_id;
    $scope.results = [];
    $scope.category_name;

    angular.forEach($scope.data.ListOfArticles, function(value) {
        if ($scope.categiry_id == value.categoryId){
            this.push(value);
        }
    }, $scope.results);

    angular.forEach($scope.data.ListOfCategories, function(value){
        if (value.id == $scope.categiry_id){
            $scope.category_name = value.name;
        }
    });
});
