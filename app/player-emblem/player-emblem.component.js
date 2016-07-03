'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('playerEmblem').
component('playerEmblem', {
    templateUrl: 'player-emblem/player-emblem.template.html',
    controller: function PlayerEmblemController($scope,$http) {
        var self = this;
        self.players = [
            {
                name: 'DrPierceClayton',
                snippet: 'GOAT'
            }, {
                name: 'RBPOLLARD',
                snippet: 'PACK'
            }, {
                name: 'Czar Clayton',
                snippet: 'DONK'
            }
        ];
        var config = {headers: {
            'Ocp-Apim-Subscription-Key': 'c2a9961279f34f89b478c962a083b2eb',
            'Access-Control-Allow-Origin': '*'
        }};

        $http.get("https://www.haloapi.com/profile/h5/profiles/DrPierceClayton/emblem?",config).then(function(response) {
            // Create Base64 Object
             self.players[0].logo =  response.data;
            self.players[1].logo = response.data;
            self.players[2].logo = response.data;
        });
    }
});