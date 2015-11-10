(function() {
    angular
        .module('custom')
        .controller('WrappingController', function($log, $scope, $rootScope, $location, $job, $stateParams) {
            console.log('schedule job');
            $scope.job = {};
            $scope.report = {};
            $job.getById($stateParams.jobId).then(function(job) {
                var rep;
                $scope.job = job;
                rep = $('<div/>').append(job.report_html)
                $scope.report = {
                    damage: rep.find(".report_damage").html(),
                    preliminary: rep.find(".preliminary_info").html(),
                    findings: rep.find(".findings").html(),
                    conclusion: rep.find(".conclusion").html(),
                    recommendation: rep.find(".summary").html(),
                    appendix: rep.find(".appendix").html()
                };
            });

            $scope.preview = function() {

                $job.getById($stateParams.jobId).then(function(job) {
                    var rep;
                    $scope.job = job;
                    rep = $('<div/>').append(job.report_html)


                    var doc = new jsPDF();
                    var elementHandler = {
                        '#ignorePDF': function(element, renderer) {
                            return true;
                        }
                    };
                    var source = rep[0];
                    doc.fromHTML(
                        source,
                        15,
                        15, {
                            'width': 180,
                            'elementHandlers': elementHandler
                        });

                    doc.output("dataurlnewwindow");
                });
            };
        });
})();
