(function() {
  angular.module('app').controller('mvCourseListSmartTableCtrl', MvCourseListSmartTableCtrl);
  MvCourseListSmartTableCtrl.$inject = ['mvCachedCoursesSvc'];

  function MvCourseListSmartTableCtrl(mvCachedCoursesSvc) {
    var vm = this;
    vm.model = {};
    vm.model.courses = [];

    init();
    function init() {
      var tempCourses = vm.model.courses = mvCachedCoursesSvc.getCoursesFromCache();
      if (tempCourses === undefined) {
        if (mvCachedCoursesSvc.getInitialDataStatus() === 'none') {
          //TODO: need to refactor
          mvCachedCoursesSvc.initialData();
          mvCachedCoursesSvc.query().$promise.then(function(data) {
            vm.model.courses = data;
          }, function(reason) {
            console.log(reason);
            vm.model.courses = [];
          });
        } else {
          vm.model.courses = [];
        }
      }
    }
  }
})();
