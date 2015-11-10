(function() {
    angular
        .module('custom')
        .controller('CompleteInspectionController', function($log, $scope, $rootScope, $location, $job, $schedule, $stateParams, $accountService, $state) {
            $scope.schedule = {};
            $scope.currentUser = $accountService.getCurrentUser();
            $scope.activity = $stateParams.activity;

            $schedule.getById($stateParams.scheduleId).then(function(schedule) {
                $scope.schedule = schedule;
            });

            $scope.confirm = function(schedule) {
                $schedule.update(schedule.id, {
                    confirmed: 1
                }).then(function() {
                    $state.go('app.inspection-complete', {
                        activity: "complete",
                        scheduleId: schedule.id
                    });
                });
            };

            $scope.complete = function(schedule) {
                $schedule.update(schedule.id, {
                    completed: 1,
                    completion_date: schedule.completion_date,
                    completion_time: schedule.completion_time,
                }).then(function() {
                    $state.go('app.detail-job', {
                        jobId: schedule.job_id
                    });
                })
            }
        });
})();
