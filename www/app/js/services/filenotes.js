(function() {
    angular
        .module('custom')
        .factory('$fileNote', function($q, $db) {
            var self = this;


            self.all = function(id) {
                return $db.query('SELECT * FROM fileNotes WHERE jobId = ?', [id])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.allForDisplay = function(id) {
                return $db.query('SELECT f.*, u.name logger FROM fileNotes f, users u WHERE jobId = ? and f.logged_by = u.id', [id])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.getById = function(id) {
                return $db.query('SELECT * FROM fileNotes WHERE id = ?', [id])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('fileNotes', obj)
                    .then(function(result) {
                        console.log("fileNotes inserted: " + result.insertId);
                    });
            };

            self.destroy = function(id) {
                return $db.destroy('fileNotes',id)
                    .then(function(result) {
                        if (result.rowsAffected > 0)
                            console.log("fileNotes deleted");
                        return result;
                    });
            };
            
            return self;
        })
})();
