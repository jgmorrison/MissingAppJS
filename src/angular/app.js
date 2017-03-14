var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.greeting = "Hello App!";
	$scope.selectedState = "";
	$scope.cityList = [];
	$scope.results = {};

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedState];
	};

	$scope.cityStateInfo = {
		'California' : ['Citrus Heights', 'Sacramento'],
		'Nevada' : ['Carson City', 'Reno'],
		'Texas' : ['Austin', 'Dallas']
	};

	$scope.getResults = function () {
		$http.get('http://localhost:3000/state')
			.then(function (res) {
				$scope.results = res.data;
			}); 
	};
});
