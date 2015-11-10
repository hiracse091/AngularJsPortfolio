(function() {
    angular
        .module('custom')
        .controller('JobReportController', function($log, $scope, $rootScope, $location, $job, $stateParams, $state) {
            console.log('report job');
            $scope.job = {};
            $job.getById($stateParams.jobId).then(function(job) {
                $scope.job = job;
            });

            $scope.saveReport = function(content) {
                content = angular.element('.report_content');
                // content.find("input, select, textarea ").replaceWith(function(ind, inp) {
                //     return $(inp).val();
                // });

                angular.forEach(content.find("input,select,textarea"), function(inp) {
                    $(inp).replaceWith($(inp).val());
                });

                $job.update($stateParams.jobId, {
                    report_html: content.html()
                }).then(function() {
                    $state.go('app.report-wrapping', {
                        jobId: $stateParams.jobId
                    })
                })
            }
        });
})();
