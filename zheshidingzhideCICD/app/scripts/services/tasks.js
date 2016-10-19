'use strict';

// TaskList is a set of tasks that need to be executed or
// are in progress.
// Current set of tasks is displayed in the overview page.
// Each task has the following members
//  - titles - { started, failure, success } - Titles to use depending on
//             state of the task
//  - helpLinks - array of { title :string, url: string }
//  - action - a function that kicks off the task and returns a promise
//             the promise resolve needs to be resolved with a structure
//             containing the following fields:
//                 - alerts - array of alerts to display
//                 - hasErrors - true if errors occurred processing the action
//  - status - whether task is: new, started, completed
//  - alerts - alerts generated by the task

angular.module('openshiftConsole')
.factory('TaskList', function($timeout) {

  // Maximum amount of time that a successful task will hang around after completion
  var TASK_TIMEOUT = 60*1000;

  function TaskList() {
    this.tasks = [];
  }

  var taskList = new TaskList();

  TaskList.prototype.add = function(titles, helpLinks, namespace, action) {
    // Set up the task
    var task = {
      status: "started",
      titles: titles,
      helpLinks: helpLinks,
      namespace: namespace
    };

    // Add the new task
    this.tasks.push(task);

    // Trigger the action
    action().then(function(result) {
      // On completion, set status, hasErrors, and alerts
      task.status = "completed";
      task.hasErrors = result.hasErrors || false;
      task.alerts = result.alerts || [];

      // If the message has errors, return... it will show until dismissed
      if (task.hasErrors) {
        return;
      }

      // Otherwise, queue the message to be deleted
      // $timeout handles calling us in an apply loop
      $timeout(function() {
        taskList.deleteTask(task);
      }, TASK_TIMEOUT);
    });
  };

  TaskList.prototype.taskList = function() {
    return this.tasks;
  };

  // deleteTask removes the task from the list of tasks
  // should be called in an apply loop
  TaskList.prototype.deleteTask = function(task) {
    // Splice in place so the view's variable changes
    var i = taskList.tasks.indexOf(task);
    if (i >= 0) {
      this.tasks.splice(i,1);
    }
  };

  // clear removes all task from the list of tasks
  TaskList.prototype.clear = function() {
    taskList.tasks = [];
  };


  return taskList;
});

