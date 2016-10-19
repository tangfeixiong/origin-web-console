'use strict';

/**
 * @ngdoc function
 * @name openshiftConsole.controller:EditAutoscalerController
 * @description
 * # EditAutoscalerController
 * Controller of the openshiftConsole
 */
angular.module('openshiftConsole')
  .controller('EditAutoscalerController',
              function ($scope,
                        $filter,
                        $routeParams,
                        $window,
                        APIService,
                        BreadcrumbsService,
                        DataService,
                        HPAService,
                        MetricsService,
                        Navigate,
                        ProjectsService,
                        keyValueEditorUtils) {
    if (!$routeParams.kind || !$routeParams.name) {
      Navigate.toErrorPage("Kind or name parameter missing.");
      return;
    }

    var supportedKinds = [
      'Deployment',
      'DeploymentConfig',
      'HorizontalPodAutoscaler',
      'ReplicaSet',
      'ReplicationController'
    ];

    if (!_.includes(supportedKinds, $routeParams.kind)) {
      Navigate.toErrorPage("Autoscaling not supported for kind " + $routeParams.kind + ".");
      return;
    }

    $scope.kind = $routeParams.kind;
    $scope.name = $routeParams.name;
    if ($routeParams.kind === "HorizontalPodAutoscaler") {
      // Wait for the HPA data to load before enabling the form controls.
      // This is only necessary when editing an existing HPA.
      $scope.disableInputs = true;
    } else {
      $scope.targetKind = $routeParams.kind;
      $scope.targetName = $routeParams.name;
    }

    $scope.autoscaling = {
      name: $scope.name
    };

    $scope.labels = [];

    // Warn if metrics aren't configured when setting autoscaling options.
    MetricsService.isAvailable().then(function(available) {
      $scope.metricsWarning = !available;
    });

    $scope.alerts = {};

    var getErrorDetails = $filter('getErrorDetails');

    var displayError = function(errorMessage, result) {
      $scope.alerts['autoscaling'] = {
        type: "error",
        message: errorMessage,
        details: getErrorDetails(result)
      };
    };

    ProjectsService
      .get($routeParams.project)
      .then(_.spread(function(project, context) {
        // Update project breadcrumb with display name.
        $scope.project = project;

        var createHPA = function() {
          $scope.disableInputs = true;
          var hpa = {
            apiVersion: "extensions/v1beta1",
            kind: "HorizontalPodAutoscaler",
            metadata: {
              name: $scope.autoscaling.name,
              labels: keyValueEditorUtils.mapEntries(keyValueEditorUtils.compactEntries($scope.labels))
            },
            spec: {
              scaleRef: {
                kind: $routeParams.kind,
                name: $routeParams.name,
                apiVersion: "extensions/v1beta1",
                subresource: "scale"
              },
              minReplicas: $scope.autoscaling.minReplicas,
              maxReplicas: $scope.autoscaling.maxReplicas,
              cpuUtilization: {
                targetPercentage: $scope.autoscaling.targetCPU || $scope.autoscaling.defaultTargetCPU
              }
            }
          };

          DataService.create({
            resource: 'horizontalpodautoscalers',
            group: 'extensions'
          }, null, hpa, context)
            .then(function() { // Success
              // Return to the previous page
              $window.history.back();
            }, function(result) { // Failure
              $scope.disableInputs = false;
              displayError('An error occurred creating the horizontal pod autoscaler.', result);
            });
        };

        var updateHPA = function(hpa) {
          $scope.disableInputs = true;

          hpa = angular.copy(hpa);
          hpa.metadata.labels = keyValueEditorUtils.mapEntries(keyValueEditorUtils.compactEntries($scope.labels));
          hpa.spec.minReplicas = $scope.autoscaling.minReplicas;
          hpa.spec.maxReplicas = $scope.autoscaling.maxReplicas;
          hpa.spec.cpuUtilization = {
            targetPercentage: $scope.autoscaling.targetCPU || $scope.autoscaling.defaultTargetCPU
          };

          DataService.update({
            resource: 'horizontalpodautoscalers',
            group: 'extensions'
          }, hpa.metadata.name, hpa, context)
            .then(function() { // Success
              // Return to the previous page
              $window.history.back();
            }, function(result) { // Failure
              $scope.disableInputs = false;
              displayError('An error occurred updating horizontal pod autoscaler "' + hpa.metadata.name + '".', result);
            });
        };

        var resourceGroup = {
          resource: APIService.kindToResource($routeParams.kind),
          group: $routeParams.group
        };

        DataService.get(resourceGroup, $routeParams.name, context).then(function(resource) {
          $scope.labels = _.map(
                            _.get(resource, 'metadata.labels', {}),
                            function(val, key) {
                              return {
                                name: key,
                                value: val
                              };
                            });

          // Are we editing an existing HPA?
          if ($routeParams.kind === "HorizontalPodAutoscaler") {
            $scope.targetKind = _.get(resource, 'spec.scaleRef.kind');
            $scope.targetName = _.get(resource, 'spec.scaleRef.name');
            _.assign($scope.autoscaling, {
              minReplicas: _.get(resource, 'spec.minReplicas'),
              maxReplicas: _.get(resource, 'spec.maxReplicas'),
              targetCPU: _.get(resource, 'spec.cpuUtilization.targetPercentage')
            });
            $scope.disableInputs = false;

            // Update the existing HPA.
            $scope.save = function() {
              updateHPA(resource);
            };

            // Build the breadcrumb for the target resource. (HPAs don't have a dedicated page.)
            $scope.breadcrumbs = BreadcrumbsService.getBreadcrumbs({
              name: $scope.targetName,
              kind: $scope.targetKind,
              namespace: $routeParams.project,
              project: project,
              subpage: 'Autoscale',
              includeProject: true
            });
          } else {
            $scope.breadcrumbs = BreadcrumbsService.getBreadcrumbs({
              object: resource,
              project: project,
              subpage: 'Autoscale',
              includeProject: true
            });

            // Create a new HPA.
            $scope.save = createHPA;

            var limitRanges = {};
            var checkCPURequest = function() {
              var containers = _.get(resource, 'spec.template.spec.containers', []);
              $scope.showCPURequestWarning = !HPAService.hasCPURequest(containers, limitRanges, project);
            };

            // List limit ranges in this project to determine if there is a default
            // CPU request for autoscaling.
            DataService.list("limitranges", context, function(response) {
              limitRanges = response.by("metadata.name");
              checkCPURequest();
            });
          }
        });
    }));
  });
