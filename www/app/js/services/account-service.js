(function() {
    angular
        .module('custom')
        .service('$accountService', function($q, $http, $window, $user, appConstants) {
            var loginFromWebApp = function(loginId, password) {
                var deferred = $q.defer();

                $http({
                        url: appConstants.urls.login,
                        method: "POST",
                        data: {
                            loginId: loginId,
                            password: password
                        }
                    }).success(function(data) {
                        if (data.authenticated) {
                            deferred.resolve({
                                success: true,
                                id: data.id
                            });
                        } else {
                            deferred.resolve({
                                success: false,
                                msg: data.msg
                            });
                        }
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            this.login = function(loginId, password) {
                var deferred = $q.defer();
                loginFromWebApp(loginId, password).then(function(result) {
                    if (result.success) {
                        $window.localStorage.setItem("loggedInUser", angular.toJson({
                            id: result.id,
                            user: loginId,
                            password: password
                        }));
                        deferred.resolve({
                            success: true
                        });
                    } else {
                        deferred.resolve({
                            success: false,
                            msg: result.msg
                        });
                    }
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            this.register = function(account) {
                var deferred = $q.defer();
                $user.insert(account).then(function() {
                    $estimator.insert({
                        name: account.name,
                        internal: 1
                    }).then(function() {
                        $window.localStorage.setItem("loggedInUser", angular.toJson({
                            user: account.email,
                            password: account.password,
                            name: account.name
                        }));
                        deferred.resolve({
                            success: true
                        });
                    }, function(msg) {
                        deferred.reject(msg);
                    });
                }, function(msg) {
                    deferred.reject(msg);
                });
                return deferred.promise;
            };

            this.isLoggedIn = function() {
                var loggedIn = !(window.localStorage.getItem("loggedInUser") === "undefined" || window.localStorage.getItem("loggedInUser") === null);
                return loggedIn;
            };

            this.getCurrentUser = function() {
                return angular.fromJson(window.localStorage.getItem("loggedInUser"));
            };

            this.logout = function() {
                return localStorage.removeItem("loggedInUser");
            };
        });
})();
