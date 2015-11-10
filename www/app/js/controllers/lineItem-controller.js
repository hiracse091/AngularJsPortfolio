(function() {
    angular
        .module('custom')
        .controller('LineItemController', function($log, $scope, $rootScope, $location, $invoice,$lineItem, $mdDialog, $stateParams) {
            console.log('add lineitem');
            
            $scope.lineItem = {};

            $scope.save = function(item) {
                console.log('save');      
                item.invoiceId = $invoice.getId();          
                item.loggedBy = 'user';
                item.loggedAt = new Date().toString();
                $lineItem.insert(item).then(function() {
                    $scope.lineItem = {};
                    $invoice.all($invoice.id).then(function(result) {
                        $rootScope.$broadcast('lineitem:updated',result);
                    });

                });                
            }
            
            
        })

})();
