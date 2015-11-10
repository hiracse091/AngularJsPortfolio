(function() {
    angular
        .module('custom')
        .factory('$user', function($q, $db) {
            var self = this;

            self.all = function() {
                return $db.query('SELECT * FROM users')
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM users WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.getEstimators = function() {
                return $db.query('SELECT * FROM users WHERE administrator = ?', [0])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('users', obj)
                    .then(function(result) {
                        console.log("user inserted: " + result.insertId);
                    });
            };

            return self;
        })
})();
