(function() {
    angular
        .module('custom')
        .factory('$schedule', function($db) {
            return {
                all: function(id) {
                    return $db.query('SELECT * FROM schedules WHERE jobId = ?', [id])
                        .then(function(result) {
                            return $db.fetchAll(result);
                        });
                },
                allEvents: function(id) {
                    return $db.query('select classification title, start_date from job j,schedules s where j.id=s.job_id', [])
                        .then(function(result) {
                            return $db.fetchAll(result);
                        });
                },
                insert: function(obj) {
                    return $db.insert('schedules', obj)
                        .then(function(result) {
                            console.log("schedule inserted: " + result.insertId);
                        });
                },

                update: function(id, obj) {
                    return $db.update('schedules', obj, id)
                        .then(function(result) {
                            console.log("schedule updated: " + id);
                        });
                },

                getById: function(id) {
                    return $db.query('SELECT * FROM schedules WHERE id = ?', [id])
                        .then(function(result) {
                            return $db.fetch(result);
                        });
                }
            }
        });
})();
