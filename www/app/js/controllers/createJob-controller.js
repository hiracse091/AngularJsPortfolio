(function() {
    angular
        .module('custom')
        .controller('CreateJobController', function($log, $scope, $rootScope, $location, $job, $address, $accountService, $fileNote) {
            console.log('create job');
            $scope.classifications = ["Engineering", "Building Consultancy", "Roof Report", "Leak Detection", "CCTV", "Engineering Design", "Other", "Plumbing", "Appliance Check"];
            $scope.customerTypes = ["Individual", "Company"];
            $scope.nameAddresss = ["Mr", "Mrs", "Mr and Mrs", "Miss", "Ms", "Mr and Ms", "Dr", "Prof", "Other"];
            $scope.placeTypes = ["Arcade", "Avenue", "Boulevard", "Bypass", "Chase", "Circuit", "Close", "Court", "Crescent", "Drive", "Esplanade", "Gardens", "Grove", "Highway", "Lane", "Mews", "Parade", "Place", "Quadrant", "Reserve", "Retreat", "Rise", "Road", "Square", "Street", "Terrace", "Way"];
            $scope.clients = ["A1 Building Group", "AJ Grant", "Allianz Australia Insurance Limited", "ASTA Group Chartered Loss Adjusters", "Balming Insurance Builders", "Bryan & Peterson", "Censeo Pty Ltd", "CGU Insurance Ltd", "Claim Central Pty. Ltd.", "Commonwealth Insurance Ltd", "Crawford and Company", "Cunningham Lindsey Australia Pty Ltd", "DAK-WAL Constructions Pty. Ltd.", "Dave Cameron", "DL Brown Adjusting Pty Ltd", "ENData Pty Ltd", "GIO General InsuranceLimited", "Joe Lopianto", "Johns Lyng Group", "Kuiper Property Services Pty Ltd", "Maincom Services", "Power Partners Australia", "RACV Insurance", "Sandra Noble", "Sergon Building Consultants", "Suncorp Metway Insurance Limited", "Techniblock", "Trend Craft Building Services", "Unique Building Services Pty Ltd", "Westpac Insurance", "Zurich Australian Insurance (VIC)"];
            $scope.clientContacts = ["Danielle Watkins", "Rod Williams", "Shaun Martin", "Justin Voulstaker", "Tony Mazoski", "AL", "Alex Adicho", "Suzie Farah", "Leo Leppanen", "Jeanette Vahaviolos", "Paul Willmot", "David McKay"];
            $scope.managingOffices = ["Essendon", "Shepparton", "Mildura", "Tasmania"];
            $scope.suberb = '';
            $scope.job = {};
            $scope.siteContactCheckBox = true;
            $scope.postalAddressCheckBox = true;
            $scope.invocieCheckBox = true;


            $scope.save = function(job) {
                var currentUser = $accountService.getCurrentUser();
                if (!job.classification || job.classification == "")
                    return false;
                console.log('save');
                job.status = 'New Job Created';
                job.date = new Date();
                job.assigned_to = job.created_by = currentUser.id;
                $job.insert(job).then(function(jobId) {
                    $fileNote.insert({jobId: jobId, notes: "Job Created", loggedAt: new Date().toString(), logged_by: currentUser.id }).then(function() {
                        $location.path('/app/dashboard');
                    });
                    //$utils.show('Success!', "Checklist updated");
                    //$utils.redirect("tab.jobs-detail", job.id);
                });
            }

            $scope.changeSiteContactCheckBox = function() {
                if ($scope.siteContactCheckBox == true) {
                    $scope.job.siteContactName = $scope.job.insurerContactName;
                    $scope.job.siteContactPhone = $scope.job.insurerPhone;
                    $scope.job.siteContactMobile = $scope.job.insurerMobile;
                    $scope.job.siteContactEmail = $scope.job.insurerEmail;
                } else {
                    $scope.job.siteContactName = '';
                    $scope.job.siteContactPhone = '';
                    $scope.job.siteContactMobile = '';
                    $scope.job.siteContactEmail = '';
                }
            }
            $scope.changePostalAddressCheckBox = function() {
                if ($scope.postalAddressCheckBox == true) {
                    $scope.job.postalAddress1 = $scope.job.riskAddress1;
                    $scope.job.postalAddressSuburb = $scope.job.riskAddressSuburb;
                    $scope.job.postalAddressPostCode = $scope.job.riskAddressPostCode;
                } else {
                    $scope.job.postalAddress1 = '';
                    $scope.job.postalAddressSuburb = '';
                    $scope.job.postalAddressPostCode = '';
                }
            }
            $scope.changeInvocieCheckBox = function() {
                if ($scope.invocieCheckBox == true) {
                    $scope.job.invoiceAs = $scope.job.insurerClient;
                } else {
                    $scope.job.invoiceAs = '';
                }
            }
            $address.all().then(function(res) {
                $scope.suberb = res;
            });
        })

})();
