"use strict";

angular.module('openshiftConsole')
  .directive('buildPipeline', function($filter, Logger) {
    return {
      restrict: 'E',
      scope: {
        build: '=',
        collapseStagesOnCompletion: '=?',
        buildConfigNameOnExpanded: '=?'
      },
      // To fill height as flexbox item.
      replace: true,
      templateUrl: 'views/directives/build-pipeline.html',
      link: function($scope) {
        // Example JSON:
        //   https://github.com/jenkinsci/pipeline-stage-view-plugin/tree/master/rest-api#get-jobjob-namerun-idwfapidescribe
        var annotation = $filter('annotation');
        $scope.$watch(function() {
          return annotation($scope.build, 'jenkinsStatus');
        }, function(value) {
          if (!value) {
            return;
          }

          try {
            $scope.jenkinsStatus = JSON.parse(value);
          } catch (e) {
            Logger.error('Could not parse Jenkins status as JSON', value);
          }
        });

        var buildConfigForBuild = $filter('buildConfigForBuild');
        $scope.$watch(function() {
          return buildConfigForBuild($scope.build);
        }, function(buildConfigName) {
          $scope.buildConfigName = buildConfigName;
        });
      }
    };
  })
  .directive('pipelineStatus', function() {
    return {
      restrict: 'E',
      scope: {
        status: '='
      },
      templateUrl: 'views/directives/pipeline-status.html'
    };
  });
