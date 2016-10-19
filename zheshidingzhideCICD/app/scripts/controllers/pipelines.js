'use strict';

/**
 * @ngdoc function
 * @name openshiftConsole.controller:PipelinesController
 * @description
 * # ProjectController
 * Controller of the openshiftConsole
 */
angular.module('openshiftConsole')
  .controller('PipelinesController', function ($filter,
                                               $routeParams,
                                               $scope,
                                               AlertMessageService,
                                               BuildsService,
                                               DataService,
                                               Logger,
                                               ProjectsService) {
    $scope.projectName = $routeParams.project;
    $scope.alerts = $scope.alerts || {};
    $scope.buildConfigs = {};

    // get and clear any alerts
    AlertMessageService.getAlerts().forEach(function(alert) {
      $scope.alerts[alert.name] = alert.data;
    });
    AlertMessageService.clearAlerts();

    var watches = [];

    ProjectsService
      .get($routeParams.project)
      .then(_.spread(function(project, context) {
        $scope.project = project;

        var builds = {};

        var buildConfigForBuild = $filter('buildConfigForBuild');
        var isIncomplete = $filter('isIncompleteBuild');
        var isPipeline = $filter('isJenkinsPipelineStrategy');
        var isNewer = $filter('isNewerResource');

        var updateStats = function(buildConfigName, build) {
          // Don't use incomplete builds for avg duration calculations.
          if (isIncomplete(build)) {
            return;
          }

          if (!$scope.statsByConfig[buildConfigName]) {
            $scope.statsByConfig[buildConfigName] = {
              count: 0,
              // total duration of all builds for calculating averages
              totalDuration: 0
            };
          }
          var stats = $scope.statsByConfig[buildConfigName];
          stats.count++;
          stats.totalDuration += BuildsService.getDuration(build);
          stats.avgDuration = _.round(stats.totalDuration / stats.count);
        };

        var update = function() {
          // Show running pipelines and the last completed.
          var interestingBuildsByConfig = {}, latestCompleteByConfig = {};
          $scope.statsByConfig = {};

          _.each(builds, function(build) {
            // Filter on the client until the server supports fieldSelector on spec.strategy.type.
            if (!isPipeline(build)) {
              return;
            }

            var buildConfigName = buildConfigForBuild(build) || "";
            // Make sure there is a key for the build config.
            if (!$scope.buildConfigs[buildConfigName]) {
              $scope.buildConfigs[buildConfigName] = null;
            }
            if (isIncomplete(build)) {
              _.set(interestingBuildsByConfig, [buildConfigName, build.metadata.name], build);
            } else if (isNewer(build, latestCompleteByConfig[buildConfigName])) {
              latestCompleteByConfig[buildConfigName] = build;
            }

            updateStats(buildConfigName, build);
          });

          // Add the latest complete build for each config to the interesting builds map.
          _.each(latestCompleteByConfig, function(build, buildConfigName) {
            _.set(interestingBuildsByConfig, [buildConfigName, build.metadata.name], build);
          });

          $scope.interestingBuildsByConfig = interestingBuildsByConfig;
        };

        // var selectJenkinsPipeline = {
        //   http: {
        //     params: {
        //       fieldSelector: 'spec.strategy.type=JenkinsPipeline'
        //     }
        //   }
        // };

        watches.push(DataService.watch("builds", context, function(buildsData) {
          $scope.buildsLoaded = true;
          builds = buildsData.by("metadata.name");
          update();
        }));

        watches.push(DataService.watch("buildconfigs", context, function(buildConfigData) {
          $scope.buildConfigsLoaded = true;
          // Filter on the client until the server supports fieldSelector on spec.strategy.type.
          // Use _.pick instead of _.filter to keep $scope.buildConfigs a map
          $scope.buildConfigs = _.pick(buildConfigData.by("metadata.name"), isPipeline);
          update();
        }));

        $scope.startBuild = function(buildConfigName) {
          BuildsService
            .startBuild(buildConfigName, context)
            .then(
              // success, don't show a message since the build will appear directly below on the page
              _.noop,
              // failure
              function reject(result) {
                $scope.alerts["start-build"] = {
                  type: "error",
                  message: "An error occurred while starting the build.",
                  details: $filter('getErrorDetails')(result)
                };
              });
        };

        $scope.$on('$destroy', function(){
          DataService.unwatchAll(watches);
        });
      }));
  });
