(function() {
    'use strict';

    angular
        .module('custom')
        .controller('CreateJobController', function($log, $scope, $rootScope, $location, $job) {
            console.log('create job');
            $scope.classifications = ["Engineering", "Building Consultancy", "Roof Report", "Leak Detection", "CCTV", "Engineering Design", "Other", "Plumbing", "Appliance Check"];
            $scope.customerTypes = ["Company", "Individual"];
            $scope.nameAddresss = ["Mr", "Mrs", "Mr and Mrs", "Miss", "Ms", "Mr and Ms", "Dr", "Prof", "Other"];
            $scope.placeTypes = ["Arcade", "Avenue", "Boulevard", "Bypass", "Chase", "Circuit", "Close", "Court", "Crescent", "Drive", "Esplanade", "Gardens", "Grove", "Highway", "Lane", "Mews", "Parade", "Place", "Quadrant", "Reserve", "Retreat", "Rise", "Road", "Square", "Street", "Terrace", "Way"];
            $scope.clients = ["A1 Building Group", "AJ Grant", "Allianz Australia Insurance Limited", "ASTA Group Chartered Loss Adjusters", "Balming Insurance Builders", "Bryan & Peterson", "Censeo Pty Ltd", "CGU Insurance Ltd", "Claim Central Pty. Ltd.", "Commonwealth Insurance Ltd", "Crawford and Company", "Cunningham Lindsey Australia Pty Ltd", "DAK-WAL Constructions Pty. Ltd.", "Dave Cameron", "DL Brown Adjusting Pty Ltd", "ENData Pty Ltd", "GIO General InsuranceLimited", "Joe Lopianto", "Johns Lyng Group", "Kuiper Property Services Pty Ltd", "Maincom Services", "Power Partners Australia", "RACV Insurance", "Sandra Noble", "Sergon Building Consultants", "Suncorp Metway Insurance Limited", "Techniblock", "Trend Craft Building Services", "Unique Building Services Pty Ltd", "Westpac Insurance", "Zurich Australian Insurance (VIC)"];
            $scope.clientContacts = ["Danielle Watkins", "Rod Williams", "Shaun Martin", "Justin Voulstaker", "Tony Mazoski", "AL", "Alex Adicho", "Suzie Farah", "Leo Leppanen", "Jeanette Vahaviolos", "Paul Willmot", "David McKay"];
            $scope.managingOffices = ["Essendon", "Shepparton", "Mildura", "Tasmania"];
            $scope.job = {};

            $scope.save = function(job) {
                console.log('save');
                job.status = 'New Job Created';
                job.date = new Date();
                $job.insert(job).then(function() {

                    //$utils.show('Success!', "Checklist updated");
                    //$utils.redirect("tab.jobs-detail", job.id);
                    $location.path('/app/dashboard');

                });
            }
        })
        .controller('JobDetailController', function($log, $scope, $rootScope, $location, $job, $stateParams) {
            console.log('detail job');
            $scope.job = {};
            $job.getById($stateParams.jobId).then(function(job) {
                $scope.job = job;
            });

            $scope.create = function() {

                $location.path('/report-wrapping/' + $scope.job.id);

            }
        })
        .controller('JobScheduleController', function($log, $scope, $rootScope, $location, $job, $stateParams) {
            console.log('schedule job');
            $scope.job = {};
            $job.getById($stateParams.jobId).then(function(job) {
                $scope.job = job;
            });

            $scope.create = function() {

                $location.path('/report-wrapping/' + $scope.job.id);

            }
        })
        .controller('JobListController', function($log, $scope, $rootScope, $state, $job) {

            $job.all().then(function(result) {
                $scope.jobs = result;
            });

            $scope.goToRport = function(jobId) {
                $state.go('app.detail-job', {
                    jobId: jobId
                });
            };
        })
        .controller('LoginFormController', function($http, $state) {
            var vm = this;

            activate();

            ////////////////

            function activate() {
                // bind here all data from the form
                vm.account = {};
                // place the message if something goes wrong
                vm.authMsg = '';

                vm.login = function(loginModel) {
                    if (vm.account.email == 'admin@independentlink.com.au' && vm.account.password == 'mirza123') {
                        $state.go('app.dashboard');
                    }
                    vm.authMsg = 'Invalid credential.';
                };
            }
        })
        .controller('RegisterFormController', function RegisterFormController($http, $state) {
            var vm = this;

            activate();

            ////////////////

            function activate() {
                // bind here all data from the form
                vm.account = {};
                // place the message if something goes wrong
                vm.authMsg = '';

                vm.register = function() {
                    vm.authMsg = '';

                    if (vm.registerForm.$valid) {

                        $http
                            .post('api/account/register', {
                                email: vm.account.email,
                                password: vm.account.password
                            })
                            .then(function(response) {
                                // assumes if ok, response is an object with some data, if not, a string with error
                                // customize according to your api
                                if (!response.account) {
                                    vm.authMsg = response;
                                } else {
                                    $state.go('app.dashboard');
                                }
                            }, function() {
                                vm.authMsg = 'Server Request Error';
                            });
                    } else {
                        // set as dirty if the user click directly to login so we show the validation messages
                        /*jshint -W106*/
                        vm.registerForm.account_email.$dirty = true;
                        vm.registerForm.account_password.$dirty = true;
                        vm.registerForm.account_agreed.$dirty = true;

                    }
                };
            }
        })
        .controller('TopbarController', function($rootScope, $scope, $state, Utils, $mdDialog) {
            $scope.openDialog = function(page, ev) {
                var path = ''
                if (page == "detail") {
                    path = 'app/views/detail.job.html'
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
        })
        .controller('JobReportController', function($log, $scope, $rootScope, $location, $job, $stateParams) {
            console.log('report job');
            $scope.job = {};
            $job.getById($stateParams.jobId).then(function(job) {
                $scope.job = job;
            });

            $scope.wrapping = function() {
                $location.path('/report-wrapping/' + $scope.job.id);
            }
        });
})();
