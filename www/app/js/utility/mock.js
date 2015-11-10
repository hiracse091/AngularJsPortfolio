(function() {
    angular
        .module('custom').run(function($httpBackend) {
            var users = [{
                    id: 1,
                    loginId: 'admin',
                    password: 'admin'
                }, {
                    id: 2,
                    loginId: 'steve',
                    password: 'steve123'
                }, {
                    id: 3,
                    loginId: 'mark',
                    password: 'mark123'
                }, {
                    id: 4,
                    loginId: 'johnny',
                    password: 'johnny123'
                }, {
                    id: 5,
                    loginId: 'marion',
                    password: 'marion123'
                }],
                estimators = [{
                    id: 1,
                    name: 'Mirza Farhan',
                    internal: 1,
                    administrator: 1
                }, {
                    id: 2,
                    name: 'Steve Jobs',
                    internal: 1,
                    administrator: 0
                }, {
                    id: 3,
                    name: 'Mark Waugh',
                    internal: 1,
                    administrator: 0
                }, {
                    id: 4,
                    name: 'Johnny Depp',
                    internal: 1,
                    administrator: 0
                }, {
                    id: 5,
                    name: 'Marion Cortilard',
                    internal: 1,
                    administrator: 0
                }],
                addresses = [{
                    id: 1,
                    address: "BAAN BAA 2390 NSW"
                }, {
                    id: 2,
                    address: "BAANDEE 6412 WA",
                }, {
                    id: 3,
                    address: "BABAKIN 6428 WA",
                }, {
                    id: 4,
                    address: "BABBAGE ISLAND 6701 WA",
                }, {
                    id: 5,
                    address: "BABINDA 2825 NSW",
                }, {
                    id: 6,
                    address: "BABINDA 4861 QLD",
                }, {
                    id: 7,
                    address: "BABYL CREEK 2470 NSW",
                }, {
                    id: 8,
                    address: "BACCHUS MARSH 3340 VIC",
                }, {
                    id: 9,
                    address: "BACK CREEK 2372 NSW",
                }, {
                    id: 10,
                    address: "BACK CREEK 2390 NSW",
                }, {
                    id: 11,
                    address: "BACK CREEK 2422 NSW",
                }, {
                    id: 12,
                    address: "BACK CREEK 2484 NSW",
                }, {
                    id: 13,
                    address: "BACK CREEK 2622 NSW",
                }, {
                    id: 14,
                    address: "BACK CREEK 2671 NSW",
                }, {
                    id: 15,
                    address: "BACK FOREST 2535 NSW",
                }];
            $httpBackend.whenGET(/^app\//).passThrough();

            $httpBackend.whenPOST('http://site.com/login').respond(function(method, url, data) {
                var data = angular.fromJson(data),
                    msg, user;
                user = users.filter(function(u) {
                    return u.loginId == data.loginId && u.password == data.password;
                });

                if (user.length > 0) {
                    msg = {
                        authenticated: true,
                        id: user[0].id
                    };
                } else {
                    msg = {
                        authenticated: false,
                        message: 'Invalid credential'
                    };
                }
                return [200, msg, {}];
            });
            $httpBackend.whenGET('http://site.com/sync').respond(function(method, url, data) {
                return [200, {
                    users: estimators,
                    addresses: addresses
                }, {}];
            });

            $httpBackend.whenGET('/addresses').respond(addresses);
        });
})();
