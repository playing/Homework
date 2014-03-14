'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('playingApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should output a name of best choice hotel', function() {
    scope.bookdates = [{
      year: 2014,
      month: 3,
      day: 9,
      weekday: 星期天weekdayint: 0,
      unixdate: 1394294400000
    }];
    scope.customer_type = "Regular";
    expect(scope.besthotel).toBe("Ridgewood Hotel is best choice!");
  });

  it('should calculate the number of weekends and weekday', function() {
    scope.bookdates = [{
      year: 2014,
      month: 3,
      day: 9,
      weekday: 星期天,
      weekdayint: 0,
      unixdate: 1394294400000
    }, {
      year: 2014,
      month: 3,
      day: 10,
      weekday: 星期一,
      weekdayint: 1,
      unixdate: 1394380800000
    }];
    expect(scope.weekendcount).toBe(1);
    expect(scope.weekcount).toBe(1);
  });

  it('should show a error message ', function() {
    scope.bookdates = [{
      year: 2014,
      month: 3,
      day: 9,
      weekday: 星期天weekdayint: 0,
      unixdate: 1394294400000
    }];

    scope.bookdates.push({
      year: 2014,
      month: 3,
      day: 9,
      weekday: 星期天weekdayint: 0,
      unixdate: 1394294400000
    });

    expect(scope.alerts[0].msg).toBe("Please don`t repeat add.");
  });
  
  it('should show a error message ', function() {
    scope.customer_type = "";
    scope.find();
    expect(scope.alerts[0].msg).toBe("Please chose your type.");
  });
});