'use strict';

angular.module('openshiftConsole')
  .directive('deploymentMetrics', function($interval,
                                           $parse,
                                           $timeout,
                                           $q,
                                           $rootScope,
                                           ChartsService,
                                           ConversionService,
                                           MetricsService) {
    return {
      restrict: 'E',
      scope: {
        pods: '=',
        // Take in the list of containers rather than reading from the pod spec
        // in case pods is empty.
        containers: '=',
        compact: '='
      },
      templateUrl: function(elem, attrs) {
        if (attrs.compact) {
          return 'views/directives/metrics-compact.html';
        }
        return 'views/directives/deployment-metrics.html';
      },
      link: function(scope) {
        var chartByMetric = {};
        var intervalPromise;
        var updateInterval = 60 * 1000; // 60 seconds
        var numDataPoints = 30;

        // Set to true when the route changes so we don't update charts that no longer exist.
        var destroyed = false;

        scope.uniqueID = _.uniqueId('metrics-');

        // Map of metric.type -> podName -> metrics data
        var data = {};

        // The last data point timestamp we've gotten.
        var lastTimestamp;

        // Wait until the charts are in view before fetching metrics.
        var paused = scope.compact;

        // Track when we last requested metrics. When we scroll into view, this
        // helps decide whether to update immediately or wait until the next
        // interval tick.
        var lastUpdated;

        // Metrics to display.
        scope.metrics = [{
          label: "Memory",
          units: "MiB",
          convert: ConversionService.bytesToMiB,
          descriptor: 'memory/usage',
          type: 'pod_container',
          chartID: "memory-" + scope.uniqueID
        }, {
          label: "CPU",
          units: "millicores",
          descriptor: 'cpu/usage_rate',
          type: 'pod_container',
          chartID: "cpu-" + scope.uniqueID
        }, {
          label: "Network (Sent)",
          units: "KiB/s",
          convert: ConversionService.bytesToKiB,
          descriptor: 'network/tx_rate',
          type: 'pod',
          compactLabel: "Network",
          compactDatasetLabel: "Sent",
          compactType: 'spline',
          chartID: "network-tx-" + scope.uniqueID
        }, {
          label: "Network (Received)",
          units: "KiB/s",
          convert: ConversionService.bytesToKiB,
          descriptor: 'network/rx_rate',
          type: 'pod',
          compactCombineWith: 'network/tx_rate',
          compactDatasetLabel: "Received",
          compactType: 'spline',
          chartID: "network-rx-" + scope.uniqueID
        }];

        var metricByID = _.indexBy(scope.metrics, 'descriptor');

        // Set to true when any data has been loaded (or failed to load).
        scope.loaded = false;
        scope.noData = true;

        // Get the URL to show in error messages.
        MetricsService.getMetricsURL().then(function(url) {
          scope.metricsURL = url;
        });

        // Relative time options.
        scope.options = {
          rangeOptions: [{
            label: "Last hour",
            value: 60
          }, {
            label: "Last 4 hours",
            value: 4 * 60
          }, {
            label: "Last day",
            value: 24 * 60
          }, {
            label: "Last 3 days",
            value: 3 * 24 * 60
          }, {
            label: "Last week",
            value: 7 * 24 * 60
          }]
        };
        // Show last hour by default.
        scope.options.timeRange = _.head(scope.options.rangeOptions);
        scope.options.selectedContainer = _.head(scope.containers);

        var createSparklineConfig = function(metric) {
          return {
            bindto: '#' + metric.chartID,
            axis: {
              x: {
                show: !scope.compact,
                type: 'timeseries',
                // With default padding you can have negative axis tick values.
                padding: {
                  left: 0,
                  bottom: 0
                },
                tick: {
                  type: 'timeseries',
                  format: '%a %H:%M'
                }
              },
              y: {
                show: !scope.compact,
                label: metric.units,
                min: 0,
                // With default padding you can have negative axis tick values.
                padding: {
                  left: 0,
                  bottom: 0,
                  top: 20
                },
                tick: {
                  format: function(value) {
                    return d3.round(value, 3);
                  }
                }
              }
            },
            legend: {
              show: !scope.compact && !scope.showAverage
            },
            point: {
              show: false
            },
            size: {
              height: scope.compact ? 35 : 175
            },
            tooltip: {
              format: {
                value: function(value) {
                  return d3.round(value, 2) + " " + metric.units;
                }
              }
            }
          };
        };

        function isNil(point) {
          return point.value === null || point.value === undefined;
        }

        scope.formatUsage = function(usage) {
          if (usage < 0.01) {
            return '0';
          }

          if (usage < 1) {
            return d3.format('.1r')(usage);
          }

          return d3.format('.2r')(usage);
        };

        function averages(metric) {
          var label;
          if (scope.compact) {
            label = metric.compactDatasetLabel || metric.label;
          } else {
            label = "Average Usage";
          }
          var averageData = {},
              dates = ['Date'],
              values = [label],
              columns = [dates, values];

          var getStats = function(point) {
            // Convert start timestamp to a string to use it as a key.
            var key = "" + point.start;
            if (!averageData[key]) {
              averageData[key] = {
                total: 0,
                count: 0
              };
            }

            return averageData[key];
          };

          _.each(data[metric.descriptor], function(podData) {
            _.each(podData, function(point) {
              var stats = getStats(point);

              if (!lastTimestamp || lastTimestamp < point.end) {
                lastTimestamp = point.end;
              }

              if (isNil(point)) {
                return;
              }
              stats.total += point.value;
              stats.count = stats.count + 1;
            });
          });

          _.each(averageData, function(stats, timestamp) {
            var avg;
            if (stats.count) {
              avg = stats.total / stats.count;
            } else {
              avg = null;
            }

            dates.push(Number(timestamp));
            values.push(metric.convert ? metric.convert(avg) : avg);
          });

          if (values.length > 1) {
            metric.lastValue = _.last(values) || 0;
          }

          return columns;
        }

        function getChartData(newData, metric) {
          var columns = [];
          var chartData = {
            type: 'spline'
          };

          // If there are too many pods, show only an average line.
          if (scope.showAverage) {
            _.each(newData[metric.descriptor], function(podData, podName) {
              updateData(metric.descriptor, podName, podData);
            });
            chartData.type = 'area-spline';
            if (scope.compact && metric.compactType) {
              chartData.type = metric.compactType;
            }

            chartData.x = 'Date';
            chartData.columns = averages(metric);
            return chartData;
          }

          // Iterate over the data for each pod.
          _.each(newData[metric.descriptor], function(podData, podName) {
            updateData(metric.descriptor, podName, podData);
            var dateName = podName + "-dates";
            _.set(chartData, ['xs', podName], dateName);

            var timestamps = [dateName];
            var dataPoints = [podName];
            columns.push(timestamps);
            columns.push(dataPoints);

            // Look at each data point for this pod.
            _.each(data[metric.descriptor][podName], function(point) {
              timestamps.push(point.start);

              if (!lastTimestamp || lastTimestamp < point.end) {
                lastTimestamp = point.end;
              }

              if (isNil(point)) {
                dataPoints.push(point.value);
              } else {
                var value = metric.convert ? metric.convert(point.value) : point.value;
                dataPoints.push(value);
              }
            });
          });

          // Sort columns by pod names to ensure each pod has the same color in all charts.
          chartData.columns = _.sortBy(columns, function(column) {
            return column[0];
          });
          return chartData;
        }

        function processData(newData) {
          if (destroyed) {
            return;
          }

          scope.loaded = true;

          // Show an average instead of a multiline chart when there are many pods.
          scope.showAverage = _.size(scope.pods) > 5 || scope.compact;

          // Iterate over each metric.
          _.each(scope.metrics, function(metric) {
            var config;
            // Get chart data for that metric.
            var chartData = getChartData(newData, metric);
            var descriptor = metric.descriptor;
            if (scope.compact && metric.compactCombineWith) {
              descriptor = metric.compactCombineWith;
              if (metric.lastValue) {
                metricByID[descriptor].lastValue = (metricByID[descriptor].lastValue || 0) + metric.lastValue;
              }
            }

            if (!chartByMetric[descriptor]) {
              config = createSparklineConfig(metric);
              config.data = chartData;
              chartByMetric[descriptor] = c3.generate(config);
            } else {
              chartByMetric[descriptor].load(chartData);
              if (scope.showAverage) {
                chartByMetric[descriptor].legend.hide();
              } else {
                chartByMetric[descriptor].legend.show();
              }
            }
          });
        }

        function getStartTime() {
          if (scope.compact) {
            // 15 minutes ago
            return "-15mn";
          }

          return "-" + scope.options.timeRange.value + "mn";
        }

        function getTimeRangeMillis() {
          return scope.options.timeRange.value * 60 * 1000;
        }

        function getBucketDuration() {
          if (scope.compact) {
            return "1mn";
          }

          return Math.floor(getTimeRangeMillis() / numDataPoints) + "ms";
        }

        function getConfig() {
          // Read the namespace from one of the pods since the namespace is not
          // passed into the directive.
          var pod = _.find(scope.pods, 'metadata.namespace');
          if (!pod) {
            return;
          }
          var config = {
            pods: scope.pods,
            containerName: scope.options.selectedContainer.name,
            namespace: pod.metadata.namespace,
            bucketDuration: getBucketDuration()
          };

          // Leave the end time off to use the server's current time as the
          // end time. This prevents an issue where the donut chart shows 0
          // for current usage if the client clock is ahead of the server
          // clock.
          if (lastTimestamp) {
            config.start = lastTimestamp;
          } else {
            config.start = getStartTime();
          }

          return config;
        }

        // Make sure there are no errors or missing data before updating.
        function canUpdate() {
          var noPods = _.isEmpty(scope.pods);
          if (noPods) {
            // Show the no metrics message.
            scope.loaded = true;
            return false;
          }
          return !scope.metricsError;
        }

        function updateData(metricType, podName, podData) {
          scope.noData = false;

          // Throw out the last data point, which is a partial bucket.
          var current = _.initial(podData);
          var previous = _.get(data, [metricType, podName]);
          if (!previous) {
            _.set(data, [metricType, podName], current);
            return;
          }

          // Don't include more than then last `numDataPoints`
          var updated = _.takeRight(previous.concat(current), numDataPoints);
          _.set(data, [metricType, podName], updated);
        }

        function handleError(response) {
          scope.loaded = true;
          scope.metricsError = {
            status:  _.get(response, 'status', 0),
            details: _.get(response, 'data.errorMsg') ||
                     _.get(response, 'statusText') ||
                     "Status code " + _.get(response, 'status', 0)
          };
        }

        function update() {
          if (paused || !canUpdate()) {
            return;
          }
          lastUpdated = Date.now();
          var config = getConfig();
          MetricsService.getPodMetrics(config).then(processData, handleError);
        }

        // Updates immediately and then on options changes.
        scope.$watch('options', function() {
          // Clear the data.
          data = {};
          lastTimestamp = null;
          delete scope.metricsError;

          update();
        }, true);
        // Also update every 30 seconds.
        intervalPromise = $interval(update, updateInterval, false);

        // Pause or resume metrics updates when the element scrolls into and
        // out of view.
        scope.updateInView = function(inview) {
          paused = !inview;

          // Update now if in view and it's been longer than updateInterval.
          if (inview && (!lastUpdated || Date.now() > (lastUpdated + updateInterval))) {
            update();
          }
        };

        $rootScope.$on('metrics.charts.resize', function(){
          $timeout(function() {
            _.each(chartByMetric, function(chart) {
              chart.flush();
            });
          }, 0);
        });

        scope.$on('$destroy', function() {
          if (intervalPromise) {
            $interval.cancel(intervalPromise);
            intervalPromise = null;
          }

          angular.forEach(chartByMetric, function(chart) {
            chart.destroy();
          });
          chartByMetric = null;

          destroyed = true;
        });
      }
    };
  });
