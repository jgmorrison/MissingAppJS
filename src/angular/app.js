var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.selectedState = "";
	$scope.cityList = [];
    $scope.stateList = [];
	$scope.results = {};

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedState];
	};

	$scope.cityStateInfo = {};
	$scope.getCityStateInfo = function () {
		$http.get('http://localhost:3000/cities')
			.then(function (res) {
				$scope.cityStateInfo = res.data;
                for (var k in res.data) {
                    $scope.stateList.push(k);
                };
			});
	};
	$scope.getCityStateInfo();

	$scope.getResults = function () {
		$http.get('http://localhost:3000/data')
			.then(function (res) {
				$scope.results = res.data;
			}); 
	};
    
});
