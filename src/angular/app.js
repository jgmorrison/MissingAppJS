var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.selectedStateIndex = "";
	$scope.cityList = [];
    $scope.stateList = [];
	$scope.results = {};

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedStateIndex].cities;
	};

	$scope.cityStateInfo = {};
	$scope.getCityStateInfo = function () {
		$http.get('http://localhost:3000/cityStateInfo')
			.then(function (res) {
				$scope.cityStateInfo = res.data;
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
