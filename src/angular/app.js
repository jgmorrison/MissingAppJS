var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.selectedStateIndex = "";
    $scope.selectedState = "";
    $scope.selectedCity = "";
	$scope.cityList = [];
    $scope.stateList = [];
	$scope.results = {};
    $scope.gender = "";

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

    $scope.monthData = {};
    $scope.getMonths = function () {
        $http.get('http://localhost:3000/months')
            .then(function (res) {
                $scope.monthData = res.data;
        });
    };
    $scope.getMonths();
    
	$scope.getResults = function () {
		$http.get('http://localhost:3000/getdata', {params: {
                "state" : $scope.selectedState, 
                "city" : $scope.selectedCity, 
                "gender" : $scope.gender}
            })
			.then(function (res) {
				$scope.results = res.data;
			}); 
	};
    
});
