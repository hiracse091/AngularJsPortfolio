(function() {
    'use strict';
    angular
        .module('custom')
        .run(function($rootScope, $db) {
            console.log('deviceready run');
            $db.init();

            $rootScope.$on('$stateChangeStart', function(event, toState) {
                $rootScope.page = toState.name;
            });
            // var redirect = function(state) {
            //     $ionicHistory.nextViewOptions({
            //         disableAnimate: true,
            //         disableBack: true
            //     });
            //     return $state.transitionTo(state);
            // };
            // $rootScope.$on("$stateChangeStart", function(event, next) {
            //     if (next.name === 'signout') {
            //         event.preventDefault();
            //         $loginService.logout();
            //     }
            //     if (next.module === 'private' && !$loginService.isLoggedIn()) {
            //         event.preventDefault();
            //         return redirect('signin');
            //     } else if (next.module === 'public' && $loginService.isLoggedIn()) {
            //         event.preventDefault();
            //         return redirect('tab.jobs');
            //     }
            //     return null;
            // });
        })


    angular
        .module('custom')
        .factory('$job', function($q, $db) {
            var self = this;

            self.all = function() {
                return $db.query('SELECT * FROM job')
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM job WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('job', obj)
                    .then(function(result) {
                        console.log("job inserted: " + result.insertId);
                    });
            };

            self.destroyAll = function() {
                return $db.destroyAll('job')
                    .then(function(result) {
                        if (result.rowsAffected > 0)
                            console.log("jobs deleted");
                        return result;
                    });
            };

            return self;
        })
        .constant('dbConfig', {
            name: 'iLink',
            tables: [{
                name: 'job',
                columns: [{
                    name: 'id',
                    type: 'integer primary key'
                }, {
                    name: 'summary',
                    type: 'text'
                }, {
                    name: 'classification',
                    type: 'text'
                }, {
                    name: 'customerType',
                    type: 'text'
                }, {
                    name: 'insurerSalutaion',
                    type: 'text'
                }, {
                    name: 'insurerFirstName',
                    type: 'text'
                }, {
                    name: 'insurerLastName',
                    type: 'text'
                }, {
                    name: 'insurerContactName',
                    type: 'text'
                }, {
                    name: 'insurerPhone',
                    type: 'text'
                }, {
                    name: 'insurerMobile',
                    type: 'text'
                }, {
                    name: 'insurerEmail',
                    type: 'text'
                }, {
                    name: 'siteContactName',
                    type: 'text'
                }, {
                    name: 'siteContactPhone',
                    type: 'text'
                }, {
                    name: 'siteContactMobile',
                    type: 'text'
                }, {
                    name: 'siteContactEmail',
                    type: 'text'
                }, {
                    name: 'riskAddress1',
                    type: 'text'
                }, {
                    name: 'riskAddressPlace',
                    type: 'text'
                }, {
                    name: 'riskAddressSuburb',
                    type: 'text'
                }, {
                    name: 'riskAddressState',
                    type: 'text'
                }, {
                    name: 'riskAddressPostCode',
                    type: 'text'
                }, {
                    name: 'postalAddressName',
                    type: 'text'
                }, {
                    name: 'postalAddressOrganization',
                    type: 'text'
                }, {
                    name: 'postalAddress1',
                    type: 'text'
                }, {
                    name: 'postalAddressPlace',
                    type: 'text'
                }, {
                    name: 'postalAddressSuburb',
                    type: 'text'
                }, {
                    name: 'postalAddressState',
                    type: 'text'
                }, {
                    name: 'postalAddressPostCode',
                    type: 'text'
                }, {
                    name: 'insurerClient',
                    type: 'text'
                }, {
                    name: 'insurerClientContact',
                    type: 'text'
                }, {
                    name: 'insurerClientRef',
                    type: 'text'
                }, {
                    name: 'insurerEvent',
                    type: 'text'
                }, {
                    name: 'insurerEventDate',
                    type: 'text'
                }, {
                    name: 'insurerEventTime',
                    type: 'text'
                }, {
                    name: 'invoiceAs',
                    type: 'text'
                }, {
                    name: 'managingOffice',
                    type: 'text'
                }, {
                    name: 'status',
                    type: 'text'
                }, {
                    name: 'date',
                    type: 'text'
                }]
            }]
        })

    .factory('$db', function($q, dbConfig) {
        var self = this;
        self.db = null;

        self.init = function() {
            //production
            //self.db = window.sqlitePlugin.openDatabase({
            //    name: dbConfig.name
            //});

            //development
            self.db = window.openDatabase(dbConfig.name, '1.0', 'database', -1);

            angular.forEach(dbConfig.tables, function(table) {
                var columns = [];

                angular.forEach(table.columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                self.query(query);
                console.log('Table ' + table.name + ' initialized');
            });
        };

        self.query = function(query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            self.db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(t1, result) {
                    deferred.resolve(result);
                }, function(t2, error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        self.fetchAll = function(result) {
            var output = [];
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
        };

        self.fetch = function(result) {
            if (result.rows.length)
                return result.rows.item(0);
            else
                return null;
        };

        self.insert = function(table, obj) {
            var deferred = $q.defer();

            self.db.transaction(function(transaction) {
                var cols = [],
                    ph = [],
                    bindings = [],
                    query = '';
                _.each(obj, function(v, k) {
                    cols.push(k);
                    bindings.push(v);
                    ph.push('?');
                });
                query = 'INSERT OR REPLACE INTO ' + table + ' (' + cols.join(',') + ') VALUES (' + ph.join(', ') + ')';

                transaction.executeSql(query, bindings, function(t1, result) {
                    deferred.resolve(result);
                }, function(t2, error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        };


        self.update = function(table, obj, id) {
            var deferred = $q.defer();

            self.db.transaction(function(transaction) {
                var bindings = [],
                    updates = _.map(obj, function(v, k) {
                        bindings.push(v);
                        return k + ' = ' + '?';
                    }).join(),
                    query = "UPDATE " + table + " SET " + updates + " WHERE id = ?";

                bindings.push(id);
                transaction.executeSql(query, bindings, function(t1, result) {
                    deferred.resolve(result);
                }, function(t2, error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        };

        self.destroy = function(table, id) {
            var deferred = $q.defer();

            self.db.transaction(function(transaction) {
                var query = "DELETE FROM " + table + " WHERE id = ?";

                transaction.executeSql(query, [id], function(t1, result) {
                    deferred.resolve(result);
                }, function(t2, error) {
                    console.log(error);
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        };

        return self;
    });
})();
