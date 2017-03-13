var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope) {
	$scope.greeting = "Hello App!";
	$scope.selectedState = "";
	$scope.cityList = [];

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedState];
	};

	$scope.cityStateInfo = {
		'California' : ['Citrus Heights', 'Sacramento'],
		'Nevada' : ['Carson City', 'Reno'],
		'Texas' : ['Austin', 'Dallas']
	};
});
