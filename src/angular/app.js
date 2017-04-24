var app = angular.module("MyApp", []);
app.controller("MyCtrl", function ($scope, $http) {
	$scope.selectedStateIndex = "";
    $scope.selectedState = "";
    $scope.selectedCity = "";
	$scope.cityList = [];
    $scope.stateList = [];
	$scope.results;
    $scope.selectedGender = "";
    $scope.selectedMonth = "";
    $scope.selectedDay = "";
    $scope.selectedYear = "";
    $scope.resultLimit = 25;
    $scope.skipAmount = 0;
    
    $scope.reset = function () {
        $scope.selectedStateIndex = "";
        $scope.selectedState = "";
        $scope.selectedCity = "";
        $scope.cityList = [];
        $scope.stateList = [];
        $scope.results;
        $scope.selectedGender = "";
        $scope.selectedMonth = "";
        $scope.selectedDay = "";
        $scope.selectedYear = "";
        $scope.skipAmount = 0;
    };

	$scope.updateCityList = function () {
		$scope.cityList = $scope.cityStateInfo[$scope.selectedStateIndex].cities;
        $scope.selectedState = $scope.cityStateInfo[$scope.selectedStateIndex].state;
	};

	$scope.cityStateInfo = {};
	$scope.getCityStateInfo = function () {
		$http.get('http://127.0.0.1:3000/cityStateInfo')
			.then(function (res) {
				$scope.cityStateInfo = res.data;
			});
	};
	$scope.getCityStateInfo();

    $scope.monthData = {};
    $scope.getMonths = function () {
        $http.get('http://127.0.0.1:3000/months')
            .then(function (res) {
                $scope.monthData = res.data;
        });
    };
    $scope.getMonths();
    
    $scope.monthCorrection = function () {
        if ($scope.selectedMonth != "") {
            return parseInt($scope.selectedMonth) + 1;
        }
        else {
        return ""; 
        }
    };
    
	$scope.getResults = function () {
		$http.get('http://127.0.0.1:3000/getdata', {params: {
                "state" : $scope.selectedState, 
                "city" : $scope.selectedCity, 
                "gender" : $scope.selectedGender,
                "year" : $scope.selectedYear,
                "month" : $scope.monthCorrection(),
                "day" : $scope.selectedDay,
                "skipAmount" : $scope.skipAmount}
            })
			.then(function (res) {
				$scope.results = res.data;
			}); 
	};
    
    $scope.days = [];
    $scope.daysRange = function () {
        for (var i = 1; i < $scope.monthData[$scope.selectedMonth].numberOfDays + 1; i++) {
            $scope.days.push(i);
        }
    };
    
    $scope.yearsRange = function (start, end) {
        $scope.years = [];
        for (var i = end; i >= start; i--) {
            $scope.years.push(i);
        }
        return $scope.years;
    };
    
});
