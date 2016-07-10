/**
 * Created by Chris on 7/3/16.
 */
'use strict';

// Register component, along with its associated controller and template
angular.
module('arenaServiceRecord').
component('arenaServiceRecord', {
    templateUrl: 'player/arena-servicerecord/arena-servicerecord.template.html',
    controller: function ArenaServiceRecordController($scope,$http) {
        var self = this;
        var config = {headers: {
            'Ocp-Apim-Subscription-Key': 'c2a9961279f34f89b478c962a083b2eb',
            'Access-Control-Allow-Origin': '*'
        }};
        var playerName = "MrPierceClayton";
        //https://www.haloapi.com/stats/h5/servicerecords/arena?players=" + playerName"[&seasonId]
        $http.get("https://www.haloapi.com/stats/h5/servicerecords/arena?players=" + playerName,config).then(function(response) {
            self.seasonData = response.data;
        });
    }
});