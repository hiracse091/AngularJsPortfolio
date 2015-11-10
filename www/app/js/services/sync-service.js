(function() {
    angular
        .module('custom')
        .service('$syncService', function($q, $http, $user, $address, appConstants) {
            var importUser = function(user) {
                    var deferred = $q.defer();
                    $user.getById(user.id).then(function(u) {
                        if (u) {
                            deferred.resolve({
                                type: "user",
                                msg: "user already exists"
                            });
                        } else {
                            $user.insert(user).then(function() {
                                deferred.resolve({
                                    type: "com",
                                    msg: "user inserted"
                                });
                            });
                        }
                    });
                    return deferred.promise;
                },
                importAddress = function(address) {
                    var deferred = $q.defer();
                    $address.getById(address.id).then(function(ord) {
                        if (ord) {
                            deferred.resolve({
                                type: "address",
                                msg: "address already exists"
                            });
                        } else {
                            $address.insert(address).then(function() {
                                deferred.resolve({
                                    type: "address",
                                    msg: "address inserted"
                                });
                            });
                        }
                    });
                    return deferred.promise;
                };

            return {
                syncIn: function(name, pw) {
                    var deferred = $q.defer();
                    $http({
                            url: appConstants.urls.sync,
                            method: "GET"
                            // params: {
                            //     _: +new Date(),
                            //     userName: name,
                            //     password: pw
                            // }
                        }).success(function(data) {
                            var promises = [];
                            angular.forEach(data.users, function(user) {
                                promises.push(importUser(user));
                            });
                            angular.forEach(data.addresses, function(address) {
                                promises.push(importAddress(address));
                            });
                            $q.all(promises).then(function(response) {
                                deferred.resolve({
                                    success: true
                                });
                            });
                        })
                        .error(function() {
                            deferred.reject("connection issue");
                        });
                    return deferred.promise;
                },
                syncOut: function(name, pw) {
                    var deferred = $q.defer();
                    // $companyOrder.all().then(function(result) {
                    //     var orderData = _.map(_.filter(result, function(order) {
                    //         return order.job_completed;
                    //     }), function(order) {
                    //         return $companyOrder.convertBack(order);
                    //     });
                    //     $http.post(appConstants.urls.syncOut, {
                    //             userName: name,
                    //             password: pw,
                    //             companyOrders: orderData
                    //         })
                    //         .success(function(data) {
                    //             var promises = [];
                    //             angular.forEach(data.companyOrders, function(companyOrder) {
                    //                 if (companyOrder.authenticated) {
                    //                     var ord = _.find(result, function(order) {
                    //                         return order.id == companyOrder.id && order.job_completed;
                    //                     });
                    //                     if (companyOrder.status == 'ok' && ord)
                    //                         promises.push(removeCompanyOrder(ord));
                    //                 }
                    //             });
                    //             $q.all(promises).then(function(response) {
                    //                 deferred.resolve({
                    //                     success: true,
                    //                     msg: response
                    //                 });
                    //             });
                    //         })
                    //         .error(function() {
                    //             deferred.reject("connection issue");
                    //         });
                    // });
                    return deferred.promise;
                }
            };
        });
})();
