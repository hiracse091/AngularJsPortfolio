(function() {
    angular
        .module('custom')
        .controller('CreateInvoiceController', function($log, $scope, $rootScope, $location, $invoice, $stateParams) {
            console.log('create invoice');
            $scope.invoiceTypes = ["Select","Final Invoice"];
            $scope.customerTypes = ["Company", "Individual"];
            $scope.nameAddresss = ["Mr", "Mrs", "Mr and Mrs", "Miss", "Ms", "Mr and Ms", "Dr", "Prof", "Other"];
            $scope.placeTypes = ["Arcade", "Avenue", "Boulevard", "Bypass", "Chase", "Circuit", "Close", "Court", "Crescent", "Drive", "Esplanade", "Gardens", "Grove", "Highway", "Lane", "Mews", "Parade", "Place", "Quadrant", "Reserve", "Retreat", "Rise", "Road", "Square", "Street", "Terrace", "Way"];
            $scope.clients = ["A1 Building Group", "AJ Grant", "Allianz Australia Insurance Limited", "ASTA Group Chartered Loss Adjusters", "Balming Insurance Builders", "Bryan & Peterson", "Censeo Pty Ltd", "CGU Insurance Ltd", "Claim Central Pty. Ltd.", "Commonwealth Insurance Ltd", "Crawford and Company", "Cunningham Lindsey Australia Pty Ltd", "DAK-WAL Constructions Pty. Ltd.", "Dave Cameron", "DL Brown Adjusting Pty Ltd", "ENData Pty Ltd", "GIO General InsuranceLimited", "Joe Lopianto", "Johns Lyng Group", "Kuiper Property Services Pty Ltd", "Maincom Services", "Power Partners Australia", "RACV Insurance", "Sandra Noble", "Sergon Building Consultants", "Suncorp Metway Insurance Limited", "Techniblock", "Trend Craft Building Services", "Unique Building Services Pty Ltd", "Westpac Insurance", "Zurich Australian Insurance (VIC)"];
            
            $scope.allTerms = ["7 days", "14 days", "30 days", "60 days"];
            $scope.invoice = {};

            $scope.save = function(invoice) {
                console.log('save');      
                invoice.jobId = $stateParams.jobId;          
                //invoice.status = 'New Invoice Created';
                invoice.invoiceDate = new Date().toString();
                $invoice.insert(invoice).then(function() {
                    $scope.invoice = {};
                    $invoice.all($stateParams.jobId).then(function(result) {
                        $rootScope.$broadcast('invocie:updated',result);
                    });
                    //$utils.show('Success!', "Checklist updated");
                    //$utils.redirect("tab.jobs-detail", job.id);
                    //$location.path('/app/dashboard');

                });
            }
            
        })

})();
