About
=====

A Chinese distribution

Tables
-------

* A devel environment


* CD



CD
---

Build

    [vagrant@localhost origin-web-console]$ grunt build
    Running "clean:dist" (clean) task
    >> 27 paths cleaned.
    
    Running "newer:jshint" (newer) task
    
    Running "newer:jshint:all" (newer) task
    
    Running "jshint:all" (jshint) task
    
    ✔ No problems
    
    
    Running "newer-postrun:jshint:all:1:/go/src/github.com/openshift/origin-web-console/node_modules/grunt-newer/.cache" (newer-postrun) task
    
    Running "newer:jshint:test" (newer) task
    No newer files to process.
    
    Running "htmlhint:html" (htmlhint) task
    >> 163 files lint free.
    
    Running "wiredep:app" (wiredep) task
    
    Running "useminPrepare:html" (useminPrepare) task
    Going through app/index.html to update the config
    Looking for build script HTML comment blocks
    
    Configuration is now:
    
      concat:
      { generated: 
       { files: 
          [ { dest: '.tmp/concat/scripts/oldieshim.js',
              src: 
               [ 'bower_components/es5-shim/es5-shim.js',
                 'bower_components/json3/lib/json3.js' ] },
            { dest: '.tmp/concat/scripts/vendor.js',
              src: 
               [ 'bower_components/es5-dom-shim/__COMPILE/a.js',
                 'bower_components/jquery/dist/jquery.js',
                 'bower_components/angular/angular.js',
                 'bower_components/json3/lib/json3.js',
                 'bower_components/es5-shim/es5-shim.js',
                 'bower_components/angular-resource/angular-resource.js',
                 'bower_components/angular-cookies/angular-cookies.js',
                 'bower_components/angular-sanitize/angular-sanitize.js',
                 'bower_components/angular-animate/angular-animate.js',
                 'bower_components/angular-touch/angular-touch.js',
                 'bower_components/angular-route/angular-route.js',
                 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                 'bower_components/lodash/lodash.js',
                 'bower_components/bootstrap/dist/js/bootstrap.js',
                 'bower_components/bootstrap-combobox/js/bootstrap-combobox.js',
                 'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                 'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
                 'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
                 'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js',
                 'bower_components/d3/d3.js',
                 'bower_components/c3/c3.js',
                 'bower_components/datatables/media/js/jquery.dataTables.js',
                 'bower_components/datatables-colreorder/js/dataTables.colReorder.js',
                 'bower_components/datatables-colvis/js/dataTables.colVis.js',
                 'bower_components/matchHeight/jquery.matchHeight-min.js',
                 'bower_components/moment/moment.js',
                 'bower_components/patternfly/dist/js/patternfly.js',
                 'bower_components/angular-patternfly/dist/angular-patternfly.js',
                 'bower_components/uri.js/src/URI.js',
                 'bower_components/uri.js/src/URITemplate.js',
                 'bower_components/uri.js/src/jquery.URI.js',
                 'bower_components/uri.js/src/URI.fragmentURI.js',
                 'bower_components/js-logger/src/logger.js',
                 'bower_components/hawtio-core/hawtio-core.js',
                 'bower_components/hawtio-extension-service/dist/hawtio-extension-service.js',
                 'bower_components/sifter/sifter.js',
                 'bower_components/microplugin/src/microplugin.js',
                 'bower_components/selectize/dist/js/selectize.js',
                 'bower_components/messenger/build/js/messenger.js',
                 'bower_components/messenger/build/js/messenger-theme-flat.js',
                 'bower_components/kubernetes-label-selector/labelSelector.js',
                 'bower_components/kubernetes-label-selector/labelFilter.js',
                 'bower_components/kubernetes-topology-graph/dist/topology-graph.js',
                 'bower_components/term.js/src/term.js',
                 'bower_components/kubernetes-container-terminal/dist/container-terminal.js',
                 'bower_components/registry-image-widgets/dist/image-widgets.js',
                 'bower_components/kubernetes-object-describer/dist/object-describer.js',
                 'bower_components/openshift-object-describer/dist/object-describer.js',
                 'bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
                 'bower_components/ace-builds/src-min-noconflict/ace.js',
                 'bower_components/ace-builds/src-min-noconflict/ext-searchbox.js',
                 'bower_components/ace-builds/src-min-noconflict/mode-dockerfile.js',
                 'bower_components/ace-builds/src-min-noconflict/mode-groovy.js',
                 'bower_components/ace-builds/src-min-noconflict/mode-yaml.js',
                 'bower_components/ace-builds/src-min-noconflict/theme-dreamweaver.js',
                 'bower_components/ace-builds/src-min-noconflict/theme-eclipse.js',
                 'bower_components/angular-ui-ace/ui-ace.js',
                 'bower_components/clipboard/dist/clipboard.js',
                 'bower_components/ansi_up/ansi_up.js',
                 'bower_components/angular-extension-registry/dist/angular-extension-registry.min.js',
                 'bower_components/angular-extension-registry/dist/compiled-templates.js',
                 'bower_components/ng-sortable/dist/ng-sortable.js',
                 'bower_components/ui-select/dist/select.js',
                 'bower_components/angular-key-value-editor/dist/angular-key-value-editor.js',
                 'bower_components/angular-key-value-editor/dist/compiled-templates.js',
                 'bower_components/angular-inview/angular-inview.js',
                 'bower_components/js-yaml/dist/js-yaml.js' ] },
            { dest: '.tmp/concat/scripts/scripts.js',
              src: 
               [ '{.tmp,app}/scripts/constants.js',
                 '{.tmp,app}/scripts/app.js',
                 '{.tmp,app}/scripts/services/logger.js',
                 '{.tmp,app}/scripts/services/ws.js',
                 '{.tmp,app}/scripts/services/userstore.js',
                 '{.tmp,app}/scripts/services/api.js',
                 '{.tmp,app}/scripts/services/auth.js',
                 '{.tmp,app}/scripts/services/authorization.js',
                 '{.tmp,app}/scripts/services/data.js',
                 '{.tmp,app}/scripts/services/discovery.js',
                 '{.tmp,app}/scripts/services/projects.js',
                 '{.tmp,app}/scripts/services/applicationGenerator.js',
                 '{.tmp,app}/scripts/services/alertMessage.js',
                 '{.tmp,app}/scripts/services/login.js',
                 '{.tmp,app}/scripts/services/logout.js',
                 '{.tmp,app}/scripts/services/navigate.js',
                 '{.tmp,app}/scripts/services/nameGenerator.js',
                 '{.tmp,app}/scripts/services/tasks.js',
                 '{.tmp,app}/scripts/services/notification.js',
                 '{.tmp,app}/scripts/services/imageStreamResolver.js',
                 '{.tmp,app}/scripts/services/util.js',
                 '{.tmp,app}/scripts/services/builds.js',
                 '{.tmp,app}/scripts/services/deployments.js',
                 '{.tmp,app}/scripts/services/imagestreams.js',
                 '{.tmp,app}/scripts/services/metrics.js',
                 '{.tmp,app}/scripts/services/storage.js',
                 '{.tmp,app}/scripts/services/constants.js',
                 '{.tmp,app}/scripts/services/limits.js',
                 '{.tmp,app}/scripts/services/routes.js',
                 '{.tmp,app}/scripts/services/charts.js',
                 '{.tmp,app}/scripts/services/hpa.js',
                 '{.tmp,app}/scripts/services/pods.js',
                 '{.tmp,app}/scripts/services/templates.js',
                 '{.tmp,app}/scripts/services/secrets.js',
                 '{.tmp,app}/scripts/services/services.js',
                 '{.tmp,app}/scripts/services/images.js',
                 '{.tmp,app}/scripts/services/keyword.js',
                 '{.tmp,app}/scripts/services/convert.js',
                 '{.tmp,app}/scripts/services/breadcrumbs.js',
                 '{.tmp,app}/scripts/services/quota.js',
                 '{.tmp,app}/scripts/services/labels.js',
                 '{.tmp,app}/scripts/controllers/projects.js',
                 '{.tmp,app}/scripts/controllers/pods.js',
                 '{.tmp,app}/scripts/controllers/pod.js',
                 '{.tmp,app}/scripts/controllers/overview.js',
                 '{.tmp,app}/scripts/controllers/topology.js',
                 '{.tmp,app}/scripts/controllers/quota.js',
                 '{.tmp,app}/scripts/controllers/monitoring.js',
                 '{.tmp,app}/scripts/controllers/builds.js',
                 '{.tmp,app}/scripts/controllers/pipelines.js',
                 '{.tmp,app}/scripts/controllers/buildConfig.js',
                 '{.tmp,app}/scripts/controllers/build.js',
                 '{.tmp,app}/scripts/controllers/image.js',
                 '{.tmp,app}/scripts/controllers/images.js',
                 '{.tmp,app}/scripts/controllers/imagestream.js',
                 '{.tmp,app}/scripts/controllers/deployments.js',
                 '{.tmp,app}/scripts/controllers/deployment.js',
                 '{.tmp,app}/scripts/controllers/deploymentConfig.js',
                 '{.tmp,app}/scripts/controllers/replicaSet.js',
                 '{.tmp,app}/scripts/controllers/services.js',
                 '{.tmp,app}/scripts/controllers/service.js',
                 '{.tmp,app}/scripts/controllers/routes.js',
                 '{.tmp,app}/scripts/controllers/route.js',
                 '{.tmp,app}/scripts/controllers/storage.js',
                 '{.tmp,app}/scripts/controllers/otherResources.js',
                 '{.tmp,app}/scripts/controllers/persistentVolumeClaim.js',
                 '{.tmp,app}/scripts/controllers/setLimits.js',
                 '{.tmp,app}/scripts/controllers/edit/buildConfig.js',
                 '{.tmp,app}/scripts/controllers/edit/autoscaler.js',
                 '{.tmp,app}/scripts/controllers/edit/healthChecks.js',
                 '{.tmp,app}/scripts/controllers/edit/route.js',
                 '{.tmp,app}/scripts/controllers/edit/yaml.js',
                 '{.tmp,app}/scripts/controllers/create/createFromImage.js',
                 '{.tmp,app}/scripts/controllers/create/nextSteps.js',
                 '{.tmp,app}/scripts/controllers/newfromtemplate.js',
                 '{.tmp,app}/scripts/controllers/labels.js',
                 '{.tmp,app}/scripts/controllers/tasks.js',
                 '{.tmp,app}/scripts/controllers/events.js',
                 '{.tmp,app}/scripts/controllers/util/oauth.js',
                 '{.tmp,app}/scripts/controllers/util/error.js',
                 '{.tmp,app}/scripts/controllers/util/logout.js',
                 '{.tmp,app}/scripts/controllers/create.js',
                 '{.tmp,app}/scripts/controllers/createProject.js',
                 '{.tmp,app}/scripts/controllers/edit/project.js',
                 '{.tmp,app}/scripts/controllers/createRoute.js',
                 '{.tmp,app}/scripts/controllers/attachPVC.js',
                 '{.tmp,app}/scripts/controllers/modals/createSecretModal.js',
                 '{.tmp,app}/scripts/controllers/modals/confirmModal.js',
                 '{.tmp,app}/scripts/controllers/modals/confirmScale.js',
                 '{.tmp,app}/scripts/controllers/modals/deleteModal.js',
                 '{.tmp,app}/scripts/controllers/modals/debugTerminal.js',
                 '{.tmp,app}/scripts/controllers/modals/confirmReplaceModal.js',
                 '{.tmp,app}/scripts/controllers/modals/processTemplateModal.js',
                 '{.tmp,app}/scripts/controllers/modals/linkService.js',
                 '{.tmp,app}/scripts/controllers/about.js',
                 '{.tmp,app}/scripts/controllers/commandLine.js',
                 '{.tmp,app}/scripts/controllers/createPersistentVolumeClaim.js',
                 '{.tmp,app}/scripts/directives/buildClose.js',
                 '{.tmp,app}/scripts/directives/createSecret.js',
                 '{.tmp,app}/scripts/directives/date.js',
                 '{.tmp,app}/scripts/directives/deleteLink.js',
                 '{.tmp,app}/scripts/directives/editWebhookTriggers.js',
                 '{.tmp,app}/scripts/directives/events.js',
                 '{.tmp,app}/scripts/directives/eventsSidebar.js',
                 '{.tmp,app}/scripts/directives/eventsBadge.js',
                 '{.tmp,app}/scripts/directives/fromFile.js',
                 '{.tmp,app}/scripts/directives/oscFileInput.js',
                 '{.tmp,app}/scripts/directives/oscFormSection.js',
                 '{.tmp,app}/scripts/directives/oscGitLink.js',
                 '{.tmp,app}/scripts/directives/oscImageSummary.js',
                 '{.tmp,app}/scripts/directives/oscKeyValues.js',
                 '{.tmp,app}/scripts/directives/oscRouting.js',
                 '{.tmp,app}/scripts/directives/oscPersistentVolumeClaim.js',
                 '{.tmp,app}/scripts/directives/oscUnique.js',
                 '{.tmp,app}/scripts/directives/oscAutoscaling.js',
                 '{.tmp,app}/scripts/directives/oscSecrets.js',
                 '{.tmp,app}/scripts/directives/oscSourceSecrets.js',
                 '{.tmp,app}/scripts/directives/replicas.js',
                 '{.tmp,app}/scripts/directives/resources.js',
                 '{.tmp,app}/scripts/directives/overviewDeployment.js',
                 '{.tmp,app}/scripts/directives/nav.js',
                 '{.tmp,app}/scripts/directives/alerts.js',
                 '{.tmp,app}/scripts/directives/parseError.js',
                 '{.tmp,app}/scripts/directives/popups.js',
                 '{.tmp,app}/scripts/directives/util.js',
                 '{.tmp,app}/scripts/directives/labels.js',
                 '{.tmp,app}/scripts/directives/templateopt.js',
                 '{.tmp,app}/scripts/directives/tasks.js',
                 '{.tmp,app}/scripts/directives/truncate.js',
                 '{.tmp,app}/scripts/directives/catalog.js',
                 '{.tmp,app}/scripts/directives/oscObjectDescriber.js',
                 '{.tmp,app}/scripts/directives/podMetrics.js',
                 '{.tmp,app}/scripts/directives/deploymentMetrics.js',
                 '{.tmp,app}/scripts/directives/logViewer.js',
                 '{.tmp,app}/scripts/directives/statusIcon.js',
                 '{.tmp,app}/scripts/directives/ellipsisPulser.js',
                 '{.tmp,app}/scripts/directives/podDonut.js',
                 '{.tmp,app}/scripts/directives/routeServicePie.js',
                 '{.tmp,app}/scripts/directives/deploymentDonut.js',
                 '{.tmp,app}/scripts/directives/quotaUsageChart.js',
                 '{.tmp,app}/scripts/directives/buildTrendsChart.js',
                 '{.tmp,app}/scripts/directives/editRequestLimit.js',
                 '{.tmp,app}/scripts/directives/editProbe.js',
                 '{.tmp,app}/scripts/directives/editCommand.js',
                 '{.tmp,app}/scripts/directives/buildPipeline.js',
                 '{.tmp,app}/scripts/directives/buildStatus.js',
                 '{.tmp,app}/scripts/directives/serviceGroupNotifications.js',
                 '{.tmp,app}/scripts/directives/overview/service.js',
                 '{.tmp,app}/scripts/directives/overview/serviceGroup.js',
                 '{.tmp,app}/scripts/directives/overview/pod.js',
                 '{.tmp,app}/scripts/directives/overview/set.js',
                 '{.tmp,app}/scripts/directives/overview/dc.js',
                 '{.tmp,app}/scripts/directives/overview/deployment.js',
                 '{.tmp,app}/scripts/directives/overview/imageNames.js',
                 '{.tmp,app}/scripts/directives/istagSelect.js',
                 '{.tmp,app}/scripts/directives/deployImage.js',
                 '{.tmp,app}/scripts/directives/selector.js',
                 '{.tmp,app}/scripts/filters/date.js',
                 '{.tmp,app}/scripts/filters/resources.js',
                 '{.tmp,app}/scripts/filters/util.js',
                 '{.tmp,app}/scripts/filters/strings.js',
                 '{.tmp,app}/scripts/directives/affix.js',
                 '{.tmp,app}/scripts/services/logLinks.js',
                 '{.tmp,app}/scripts/extensions/javalink/javaLink.js',
                 '{.tmp,app}/scripts/extensions/nav/helpDropdown.js',
                 '{.tmp,app}/scripts/extensions/nav/userDropdown.js',
                 '{.tmp,app}/scripts/extensions/nav/dropdownMobile.js' ] } ] } }
    
      uglify:
      { generated: 
       { files: 
          [ { dest: 'dist/scripts/oldieshim.js',
              src: [ '.tmp/concat/scripts/oldieshim.js' ] },
            { dest: 'dist/scripts/vendor.js',
              src: [ '.tmp/concat/scripts/vendor.js' ] },
            { dest: 'dist/scripts/scripts.js',
              src: [ '.tmp/concat/scripts/scripts.js' ] } ],
         options: 
          { compress: {},
            mangle: {},
            beautify: 
             { beautify: true,
               indent_level: 0,
               space_colon: false,
               width: 1000 } } } }
    
      cssmin:
      { generated: 
       { files: 
          [ { dest: 'dist/styles/vendor.css',
              src: 
               [ 'bower_components/angular-patternfly/dist/styles/angular-patternfly.css',
                 'bower_components/messenger/build/css/messenger-theme-flat.css',
                 'bower_components/kubernetes-label-selector/labelFilter.css',
                 'bower_components/kubernetes-topology-graph/dist/topology-graph.css',
                 'bower_components/kubernetes-container-terminal/dist/container-terminal.css',
                 'bower_components/registry-image-widgets/dist/image-widgets.css',
                 'bower_components/layout.attrs/dist/layout.attrs.css',
                 'bower_components/ng-sortable/dist/ng-sortable.css',
                 'bower_components/ui-select/dist/select.css' ] },
            { dest: 'dist/styles/main.css',
              src: [ '.tmp/styles/main.css' ] } ],
         options: 
          { keepBreaks: true,
            compatibility: { properties: { zeroUnits: false } } } } }
    
    Running "ngtemplates:dist" (ngtemplates) task
    File dist/scripts/templates.js created.
    
    Running "concurrent:dist" (concurrent) task
    >> Warning: There are more tasks than your concurrency limit. After this limit
    >> is reached no further tasks will be run until the current tasks are
    >> completed. You can adjust the limit in the concurrent task options
        
        Running "svgmin:dist" (svgmin) task
        ✔ app/images/logo-origin-thin.svg (saved 5.62 kB 61%)
        ✔ app/images/logo-origin.svg (saved 2.71 kB 34%)
        ✔ app/images/openshift-logo.svg (saved 1.43 kB 35%)
        ✔ app/images/redhat.svg (saved 2.52 kB 28%)
        Total saved: 12.27 kB
        
        Done, without errors.
        
        
        Execution Time (2016-10-19 04:55:18 UTC)
        loading tasks   90ms  ▇▇▇▇▇▇ 12%
        svgmin:dist    683ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 88%
        Total 774ms
            
        Running "less:production" (less) task
        >> 1 stylesheet created.
        
        Done, without errors.
        
        
        Execution Time (2016-10-19 04:55:18 UTC)
        loading tasks    76ms  ▇▇ 3%
        less:production  2.6s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 97%
        Total 2.7s
            
        Running "concurrent:server" (concurrent) task
        >> Warning: There are more tasks than your concurrency limit. After this limit
        >> is reached no further tasks will be run until the current tasks are
        >> completed. You can adjust the limit in the concurrent task options
            
            Running "copy:styles" (copy) task
            Created 1 directory, copied 61 files
            
            Done, without errors.
            
            
            Execution Time (2016-10-19 04:56:32 UTC)
            loading tasks  69ms  ▇▇▇ 5%
            copy:styles    1.4s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 95%
            Total 1.5s
                
            Running "less:development" (less) task
            >> 1 stylesheet created.
            >> 1 sourcemap created.
            
            Done, without errors.
            
            
            Execution Time (2016-10-19 04:56:32 UTC)
            loading tasks     78ms  ▇ 2%
            less:development  3.7s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 98%
            Total 3.8s
                
            Running "copy:extensions" (copy) task
            Copied 2 files
            
            Done, without errors.
            
            
            Execution Time (2016-10-19 04:57:18 UTC)
            loading tasks    59ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 56%
            copy:extensions  46ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 43%
            Total 106ms
                
            Running "copy:localConfig" (copy) task
            Copied 1 file
            
            Done, without errors.
            
            
            Execution Time (2016-10-19 04:57:19 UTC)
            loading tasks     42ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 76%
            copy:localConfig  13ms  ▇▇▇▇▇▇▇▇▇▇▇ 24%
            Total 55ms
            
        Done, without errors.
        
        
        Execution Time (2016-10-19 04:55:47 UTC)
        concurrent:server  1m 32.1s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 100%
        Total 1m 32.1s
        
    Running "autoprefixer:dist" (autoprefixer) task
    File .tmp/styles/extensions.css created.
    File .tmp/styles/main.css created.
    File .tmp/styles/main.css.map created (source map).
    
    Running "concat:generated" (concat) task
    
    Running "ngAnnotate:dist" (ngAnnotate) task
    >> 2 files successfully generated.
    
    Running "copy:dist" (copy) task
    Created 10 directories, copied 290 files
    
    Running "less:development" (less) task
    >> 1 stylesheet created.
    >> 1 sourcemap created.
    
    Running "less:production" (less) task
    >> 1 stylesheet created.
    
    Running "cssmin:generated" (cssmin) task
    >> 2 files created. 612.58 kB → 490.87 kB
    
    Running "uglify:generated" (uglify) task
    File dist/scripts/oldieshim.js created: 94.23 kB → 26.07 kB
    File dist/scripts/vendor.js created: 5.37 MB → 2.23 MB
    File dist/scripts/scripts.js created: 923.7 kB → 406.23 kB
    >> 3 files created.
    
    Running "usemin:html" (usemin) task
    
    Processing as HTML - dist/404.html
    Update the HTML to reference our concat/min/revved script files
    Update the HTML with the new css filenames
    Update the HTML with the new img filenames
    Update the HTML with the new video filenames
    Update the HTML with the new poster filenames
    Update the HTML with the new source filenames
    Update the HTML with data-main tags
    Update the HTML with data-* tags
    Update the HTML with background imgs, case there is some inline style
    Update the HTML with anchors images
    Update the HTML with reference in input
    Update the HTML with the new img filenames in meta tags
    Update the HTML with the new object filenames
    Update the HTML with the new image filenames for svg xlink:href links
    Update the HTML with the new image filenames for src links
    
    Processing as HTML - dist/index.html
    Update the HTML to reference our concat/min/revved script files
    Update the HTML with the new css filenames
    Update the HTML with the new img filenames
    Update the HTML with the new video filenames
    Update the HTML with the new poster filenames
    Update the HTML with the new source filenames
    Update the HTML with data-main tags
    Update the HTML with data-* tags
    Update the HTML with background imgs, case there is some inline style
    Update the HTML with anchors images
    Update the HTML with reference in input
    Update the HTML with the new img filenames in meta tags
    Update the HTML with the new object filenames
    Update the HTML with the new image filenames for svg xlink:href links
    Update the HTML with the new image filenames for src links
    
    Running "usemin:css" (usemin) task
    
    Processing as CSS - dist/styles/main.css
    Update the CSS to reference our revved images
    
    Processing as CSS - dist/styles/vendor.css
    Update the CSS to reference our revved images
    
    Running "htmlmin:dist" (htmlmin) task
    Minified 2 files
    
    Done, without errors.
    
    
    Execution Time (2016-10-19 04:54:26 UTC)
    jshint:all            2.1s  ▇▇ 1%
    wiredep:app           2.8s  ▇▇ 1%
    concurrent:dist   2m 45.8s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 80%
    ngAnnotate:dist       4.7s  ▇▇▇ 2%
    copy:dist             3.5s  ▇▇▇ 2%
    less:development      2.7s  ▇▇ 1%
    uglify:generated     18.3s  ▇▇▇▇▇▇▇▇▇▇▇ 9%
    Total 3m 28.1s
    
The dist

    [vagrant@localhost origin-web-console]$ ls -l dist/ dist.java/
    dist/:
    总用量 12
    -rw-r--r--. 1 vagrant vagrant 3414 10月 19 04:57 404.html
    drwxr-xr-x. 1 vagrant vagrant  510 10月 19 04:57 images
    -rw-r--r--. 1 vagrant vagrant 2213 10月 19 04:57 index.html
    -rw-r--r--. 1 vagrant vagrant   31 9月  30 01:03 robots.txt
    drwxr-xr-x. 1 vagrant vagrant  204 10月 19 04:57 scripts
    drwxr-xr-x. 1 vagrant vagrant  170 10月 19 04:57 styles
    
    dist.java/:
    总用量 0
    drwxr-xr-x. 1 vagrant vagrant 374 10月 14 10:03 java
    
    [vagrant@localhost origin-web-console]$ date
    2016年 10月 19日 星期三 05:07:28 UTC
