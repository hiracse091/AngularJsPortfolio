(function() {
    angular
        .module('custom')
        .controller('JobListController', function($log, $scope, $rootScope, $state, $job, $accountService) {
            var currentUser = $accountService.getCurrentUser();

            $job.getByAssignedUser(currentUser.id).then(function(result) {
                $scope.jobs = result;
            });

            $scope.goToRport = function(jobId, job) {
                $job.setId(jobId);

                if (job.assigned_to == currentUser.id) {
                    $job.schedule(jobId).then(function(schedule) {
                        if (schedule) {
                            if (!schedule.confirmed) {
                                $state.go('app.inspection-complete-confirm', {
                                    activity: "confirm",
                                    scheduleId: schedule.id
                                });
                            } else if (!schedule.completed) {
                                $state.go('app.inspection-complete', {
                                    activity: "complete",
                                    scheduleId: schedule.id
                                });
                            } else {
                                $state.go('app.detail-job', {
                                    jobId: jobId
                                });
                            }
                        } else {
                            $state.go('app.shedule-job', {
                                jobId: jobId
                            });
                        }
                    });

                } else {
                    $state.go('app.detail-job', {
                        jobId: jobId
                    });
                }
            };

        })
})();
