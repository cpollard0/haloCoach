/**
 * Created by Chris on 7/3/16.
 */
'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('seasonDropdown').
component('seasonDropdown', {
    templateUrl: 'season-dropdown/season-dropdown.template.html',
    controller: function SeasonDropdownController($scope,$http) {
        var self = this;

        var config = {headers: {
            'Ocp-Apim-Subscription-Key': 'c2a9961279f34f89b478c962a083b2eb',
            'Access-Control-Allow-Origin': '*'
        }};

        $http.get("https://www.haloapi.com/metadata/h5/metadata/seasons",config).then(function(response) {
            self.seasons = response.data;
        });
    }
});