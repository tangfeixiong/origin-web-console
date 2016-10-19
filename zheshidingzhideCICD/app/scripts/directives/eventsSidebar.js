'use strict';

angular.module('openshiftConsole')
  .directive('eventsSidebar', function(DataService, Logger, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        projectContext: "=",
        collapsed: "="
      },
      templateUrl: 'views/directives/events-sidebar.html',
      controller: function($scope) {
        var watches = [];
        watches.push(DataService.watch("events", $scope.projectContext, function(eventData) {
          var events = eventData.by('metadata.name');
          $scope.events = _.sortByOrder(events, ['lastTimestamp'], ['desc']);
          $scope.warningCount = _.size(_.filter(events, { type: 'Warning' }));
          Logger.log("events (subscribe)", $scope.events);
        }));

        $scope.highlightedEvents = {};

        $scope.collapseSidebar = function(){
          $scope.collapsed = true;
        };

        $rootScope.$on('event.resource.highlight', function(evt, data) {
          var targetKind = _.get(data, 'kind');
          var targetName = _.get(data, 'metadata.name');
          if (!targetKind || !targetName) {
            return;
          }
          _.each($scope.events, function(event) {
            if (event.involvedObject.kind === targetKind && event.involvedObject.name === targetName) {
              $scope.highlightedEvents[targetKind + "/" + targetName] = true;
            }
          });
        });

        $rootScope.$on('event.resource.clear-highlight', function(event, data) {
          var targetKind = _.get(data, 'kind');
          var targetName = _.get(data, 'metadata.name');
          if (!targetKind || !targetName) {
            return;
          }
          _.each($scope.events, function(event) {
            if (event.involvedObject.kind === targetKind && event.involvedObject.name === targetName) {
              $scope.highlightedEvents[targetKind + "/" + targetName] = false;
            }
          });
        });        

        $scope.$on('$destroy', function() {
          DataService.unwatchAll(watches);
        });
      },
    };
  });

