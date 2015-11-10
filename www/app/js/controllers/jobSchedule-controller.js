(function() {
    angular
        .module('custom')
        .controller('JobScheduleController', function($log, $scope, $rootScope, $location, $job, $stateParams) {
            console.log('schedule job');
            $scope.job = {};
            $job.getById($stateParams.jobId).then(function(job) {
                $scope.job = job;
            });

            $scope.create = function() {
                $location.path('/report-wrapping/' + $scope.job.id);
            }
        });
})();
