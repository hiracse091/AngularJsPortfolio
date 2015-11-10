(function() {
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

            self.getByAssignedUser = function(id) {
                return $db.query('SELECT * FROM job WHERE created_by = ? OR assigned_to = ?', [id, id])
                    .then(function(result) {
                        return $db.fetchAll(result);
                    });
            };

            self.schedule = function(jobId) {
                return $db.query('SELECT * FROM schedules WHERE job_id = ?', [jobId])
                    .then(function(result) {
                        return $db.fetch(result);
                    });
            };

            self.insert = function(obj) {
                return $db.insert('job', obj)
                    .then(function(result) {
                        console.log("job inserted: " + result.insertId);
                        return result.insertId;
                    });
            };

            self.update = function(id, obj) {
                return $db.update('job', obj, id)
                    .then(function(result) {
                        console.log("job updated: " + id);
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
            self.setId = function(id) {
                self.id = id; 
            }
            self.getId = function() {
                return self.id;
            }
            return self;
        })
})();
