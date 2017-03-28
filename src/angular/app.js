var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.selectedStateIndex = "";
    $scope.selectedState = "";
    $scope.selectedCity = "";
	$scope.cityList = [];
    $scope.stateList = [];
	$scope.results = {};

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedStateIndex].cities;
        $scope.selectedState = $scope.cityStateInfo[$scope.selectedStateIndex].state;
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
		$http.get('http://localhost:3000/data/' + $scope.selectedState + '/' + $scope.selectedCity)
			.then(function (res) {
				$scope.results = res.data;
			}); 
	};
    
});
