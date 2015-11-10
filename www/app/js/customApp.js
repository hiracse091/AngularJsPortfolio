(function() {
    angular
        .module('custom')
        .run(function($rootScope, $db) {
            console.log('deviceready run');
            $db.init();

            $rootScope.$on('$stateChangeStart', function(event, toState) {
                $rootScope.page = toState.name;
            });
        })
})();
