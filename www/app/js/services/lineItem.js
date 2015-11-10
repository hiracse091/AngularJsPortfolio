(function() {
    angular
        .module('custom')
        .factory('$lineItem', function($q, $db) {
            var self = this;


            self.all = function(id) {
                return $db.query('SELECT * FROM lineItems WHERE invoiceId = ?', [id])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM lineItems WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('lineItems', obj)
                    .then(function(result) {
                        console.log("lineItems inserted: " + result.insertId);
                    });
            };

            self.destroy = function(id) {
                return $db.destroy('lineItems',id)
                    .then(function(result) {
                        if (result.rowsAffected > 0)
                            console.log("lineItems deleted");
                        return result;
                    });
            };
            
            return self;
        })
})();
