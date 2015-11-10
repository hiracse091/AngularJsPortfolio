(function() {
    angular
        .module('custom')
        .controller('FileNotesController', function($log, $scope, $rootScope, $location,$job,$fileNote,$stateParams, $accountService) {
            console.log('file notes');
           
            $scope.fileNote = {};
            $scope.formatDate = function(date){
                  var dateOut = new Date(date);
                  return dateOut;
            };
            $scope.save = function(filenote) {
                console.log('save');      
                filenote.jobId = $stateParams.jobId;          
                filenote.logged_by = $accountService.getCurrentUser().id;
                filenote.loggedAt = new Date().toString();
                $fileNote.insert(filenote).then(function() {
                    $scope.fileNote = {};
                    $fileNote.allForDisplay($stateParams.jobId).then(function(result) {
                        $scope.fileNotes = result;
                    });
                });                
            }
            $fileNote.allForDisplay($stateParams.jobId).then(function(result) {
                $scope.fileNotes = result;
            });
            
        })

})();
