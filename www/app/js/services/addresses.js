(function() {
    angular
        .module('custom')
        .factory('$address', function($q, $db) {
            var self = this;


            self.all = function() {
                return $db.query('SELECT * FROM addresses', [])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM addresses WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('addresses', obj)
                    .then(function(result) {
                        console.log("addresses inserted: " + result.insertId);
                    });
            };

            self.destroy = function(id) {
                return $db.destroy('addresses',id)
                    .then(function(result) {
                        if (result.rowsAffected > 0)
                            console.log("addresses deleted");
                        return result;
                    });
            };
            
            return self;
        })
})();
