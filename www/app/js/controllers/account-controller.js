(function() {
    angular
        .module('custom')
        .controller('LoginFormController', function($http, $state, $accountService) {
            var vm = this;

            activate();

            ////////////////

            function activate() {
                // bind here all data from the form
                vm.account = {};
                // place the message if something goes wrong
                vm.authMsg = '';
            }
            vm.login = function(loginModel) {
                vm.account.email = "admin";
                vm.account.password = "admin";
                $accountService.login(vm.account.email, vm.account.password).then(function(data) {
                    if (data.success) {
                        $state.go('app.dashboard');
                    } else {
                        //$utils.show('Login failed!', data.msg);
                        vm.authMsg = data.msg;
                    }
                }, function(message) {
                    //$utils.show('Login failed!', message);
                    vm.authMsg = message;
                });
            }

        });
})();
