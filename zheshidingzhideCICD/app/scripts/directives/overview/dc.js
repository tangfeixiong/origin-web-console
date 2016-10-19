'use strict';

angular.module('openshiftConsole')
  .directive('overviewDeploymentConfig', function($filter, $uibModal, DeploymentsService) {
    return {
      restrict: 'E',
      // Inherit scope from OverviewController. This directive is only used for the overview.
      // We want to do all of the grouping of resources once in the overview controller watch callbacks.
      scope: true,
      templateUrl: 'views/overview/_dc.html',
      link: function($scope) {
        var orderByDate = $filter('orderObjectsByDate');
        var deploymentIsInProgress = $filter('deploymentIsInProgress');

        $scope.$watch(function() {
          return _.get($scope, ['deploymentConfigs', $scope.dcName]);
        }, function(deploymentConfig) {
          $scope.deploymentConfig = deploymentConfig;
        });

        $scope.$watch('scalableReplicationControllerByDC', function(replicationControllers) {
          $scope.activeReplicationController = _.get($scope, ['scalableReplicationControllerByDC', $scope.dcName]);
        });

        $scope.$watch('replicationControllers', function(replicationControllers) {
          $scope.orderedReplicationControllers = orderByDate(replicationControllers, true);
          $scope.inProgressDeployment = _.find($scope.orderedReplicationControllers, deploymentIsInProgress);
        });

        var resumePending;
        $scope.$watch('deploymentConfig.spec.paused', function() {
          resumePending = false;
        });
        $scope.resumeDeployment = function() {
          // Guard against double clicks.
          if (resumePending) {
            return;
          }

          resumePending = true;
          DeploymentsService.setPaused($scope.deploymentConfig, false, {
            namespace: $scope.deploymentConfig.metadata.namespace
          }).then(_.noop, function(e) {
            resumePending = false;
            $scope.alerts["resume-deployment"] = {
              type: "error",
              message: "An error occurred resuming the deployment.",
              details: $filter('getErrorDetails')(e)
            };
          });
        };

        $scope.cancelDeployment = function() {
          var replicationController = $scope.inProgressDeployment;
          if (!replicationController) {
            return;
          }

          var rcName = replicationController.metadata.name;
          var latestVersion = _.get($scope, 'deploymentConfig.status.latestVersion');
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/confirm.html',
            controller: 'ConfirmModalController',
            resolve: {
              modalConfig: function() {
                return {
                  message: "Cancel deployment " + rcName + "?",
                  details: latestVersion ? ("This will attempt to stop the in-progress deployment and rollback to the previous deployment, #" + latestVersion + ". It may take some time to complete.") :
                                            "This will attempt to stop the in-progress deployment and may take some time to complete.",
                  okButtonText: "Yes, cancel",
                  okButtonClass: "btn-danger",
                  cancelButtonText: "No, don't cancel"
                };
              }
            }
          });

          modalInstance.result.then(function() {
            // Make sure we have the latest resource version of the deployment.
            var replicationController = _.get($scope, ['replicationControllersByName', rcName]);
            if (!replicationController) {
              $scope.alerts["cancel-deployment"] = {
                type: "error",
                message: "Deployment " + rcName + " no longer exists."
              };
              return;
            }

            // Make sure it's still running.
            if (!deploymentIsInProgress(replicationController)) {
              $scope.alerts["cancel-deployment"] = {
                type: "error",
                message: "Deployment " + rcName + " is no longer in progress."
              };
              return;
            }

            DeploymentsService.cancelRunningDeployment(replicationController, $scope.projectContext, $scope);
          });
        };
      }
    };
  });
