(function() {
    angular
        .module('custom')
        .controller('InvoiceDetailController', function($log, $scope, $rootScope, $location, $invoice,$lineItem,$job, $mdDialog, $stateParams) {
            console.log('invoice details');
            $scope.invoiceTypes = ["Select","Final Invoice"];            
            $scope.allTerms = ["7 days", "14 days", "30 days", "60 days"];
            $scope.invoice = {};
            $scope.showLineItem = false;
            $scope.openDialog = function(page, ev) {
                var path = ''
                if (page == "create-invoice") {
                    path = 'app/views/create.invoice.html'
                }else if (page == "add-lineitem") {
                    path = 'app/views/add.lineitem.html'
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
            $scope.$on('invocie:updated', function(event,data) {                
                $invoice.all($stateParams.jobId).then(function(result) {
                    $scope.invoices = result;
                });
            });
            $scope.$on('lineitem:updated', function(event,data) {                
                $lineItem.all($invoice.getId()).then(function(result) {
                    $scope.lineItems = result;
                });
            });
            $invoice.all($job.getId()).then(function(result) {
                $scope.invoices = result;
            });
            $scope.getLineItems = function(invoiceId){
                $invoice.setId(invoiceId);
                $scope.showLineItem = true;
                $lineItem.all(invoiceId).then(function(result) {
                    $scope.lineItems = result;
                });
            }
            $scope.delete = function(id) {
                $lineItem.destroy(id).then(function(result) {
                    $rootScope.$broadcast('lineitem:updated',result);
                });
            }
            
        })

})();
