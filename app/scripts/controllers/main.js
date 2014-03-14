'use strict';

angular.module('playingApp')
	.controller('MainCtrl', function($scope) {
		$scope.bookdates = [];
		$scope.alerts = [];
		$scope.weekcount = 0;
		$scope.weekendcount = 0;
		$scope.lakewood = [];
		$scope.bridgewood = [];
		$scope.ridgewood = [];
		$scope.besthotel;

		var weekdays = new Array(7);
		weekdays[0] = "Sunday"
		weekdays[1] = "Monday"
		weekdays[2] = "Tuesday"
		weekdays[3] = "Wednesday"
		weekdays[4] = "Thursday"
		weekdays[5] = "Friday"
		weekdays[6] = "Saturday"

		$scope.lakewood[0] = 3;
		$scope.bridgewood[0] = 4;
		$scope.ridgewood[0] = 5;
		$scope.lakewood[1] = 0;
		$scope.bridgewood[1] = 0;
		$scope.ridgewood[1] = 0;

		$scope.today = function() {
			$scope.datepick = new Date();
		};

		$scope.today();

		$scope.adddate = function() {
			var year = $scope.datepick.getFullYear();
			var month = $scope.datepick.getMonth() + 1;
			var weekdayint = $scope.datepick.getDay();
			var weekday = weekdays[weekdayint];
			var day = $scope.datepick.getDate();
			var unixdate = $scope.datepick.getTime();

			for (var i = $scope.bookdates.length - 1; i >= 0; i--) {
				if ($scope.bookdates[i].unixdate === unixdate) {
					$scope.alerts.push({
						type: "danger",
						msg: "Please don`t repeat add."
					});
					return false;
				}
			};

			$scope.bookdates.push({
				year: year,
				month: month,
				day: day,
				weekday: weekday,
				weekdayint: weekdayint,
				unixdate: unixdate
			});

		};

		$scope.deldate = function(index) {
			$scope.bookdates.splice(index, 1);
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.count = function() {

			for (var i = $scope.bookdates.length - 1; i >= 0; i--) {
				if ($scope.bookdates[i].weekdayint === 0 || $scope.bookdates[i].weekdayint === 6) {
					$scope.weekendcount++;
				} else {
					$scope.weekcount++;
				}
			};
		}

		$scope.find = function() {
			$scope.lakewood[1] = 0;
			$scope.bridgewood[1] = 0;
			$scope.ridgewood[1] = 0;
			$scope.weekcount = 0;
			$scope.weekendcount = 0;
			$scope.count();
			if ($scope.customer_type === "Regular") {
				$scope.lakewood[1] = $scope.weekcount * 110 + $scope.weekendcount * 90;
				$scope.bridgewood[1] = $scope.weekcount * 160 + $scope.weekendcount * 60;
				$scope.ridgewood[1] = $scope.weekcount * 110 + $scope.weekendcount * 50;
			} else {
				if ($scope.customer_type === "Rewards") {
					$scope.lakewood[1] = $scope.weekcount * 80 + $scope.weekendcount * 80;
					$scope.bridgewood[1] = $scope.weekcount * 110 + $scope.weekendcount * 50;
					$scope.ridgewood[1] = $scope.weekcount * 100 + $scope.weekendcount * 40;
				} else {
					$scope.alerts.push({
						type: "danger",
						msg: "Please chose your type."
					});
					return false;
				}
			}
			if ($scope.lakewood[1] < $scope.bridgewood[1] && $scope.lakewood[1] < $scope.ridgewood[1]) {

				$scope.besthotel = "Lakewood Hotel is best choice!";
			} else {
				if ($scope.bridgewood[1] < $scope.lakewood[1] && $scope.bridgewood[1] < $scope.ridgewood[1]) {
					$scope.besthotel = "Bridgewood Hotel is best choice!";
				}
				if ($scope.lakewood[1] === $scope.bridgewood[1] && $scope.bridgewood[1] < $scope.ridgewood[1]) {

					$scope.besthotel = "Bridgewood Hotel is best choice!";
					return false;
				}
				$scope.besthotel = "Ridgewood Hotel is best choice!";
			};

		};


	});