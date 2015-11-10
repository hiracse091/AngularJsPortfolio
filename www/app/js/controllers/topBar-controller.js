(function() {
    angular
        .module('custom')
        .controller('TopbarController', function($rootScope, $scope, $state, Utils,$job, $mdDialog) {
            $scope.openDialog = function(page, ev) {
                var path = ''
                if (page == "detail") {
                    path = 'app/views/detail.job.html'
                }
                else if(page == "filenotes") {
                    path = 'app/views/filenotes.html'
                }

                $mdDialog.show({
                        controller: function($scope, $mdDialog) {
                            $scope.hide = function() {
                                $mdDialog.hide();
                            };
                            $scope.cancel = function() {
                                $mdDialog.cancel();
                            };
                            $scope.answer = function(answer) {
                                $mdDialog.hide(answer);
                            };
                        },
                        templateUrl: path,
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };
            $scope.goToInvoice = function() {               
                $state.go('app.invoice', {
                    jobId: $job.getId()
                });
            };
        })
})();
