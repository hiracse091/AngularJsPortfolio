(function() {
    angular
        .module('custom')
        .factory('$invoice', function($q, $db) {
            var self = this;
            self.id = '';
            self.all = function(id) {
                return $db.query('SELECT * FROM invoice WHERE jobId = ?', [id])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM invoice WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('invoice', obj)
                    .then(function(result) {
                        console.log("invoice inserted: " + result.insertId);
                    });
            };

            self.destroyAll = function() {
                return $db.destroyAll('invoice')
                    .then(function(result) {
                        if (result.rowsAffected > 0)
                            console.log("invoice deleted");
                        return result;
                    });
            };

            self.setId = function(id) {
                self.id = id; 
            }
            self.getId = function() {
                return self.id;
            }

            return self;
        })
})();
