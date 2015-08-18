var extend = require('util')._extend;

module.exports.init = function(opt) {

  var jober = {

    interval: 60, // in seconds
    jobs: [],

    beforeTick: function() {},
    onTick: function(task) {},
    afterTick: function() {},

    pushTask: function(t) {
      jober.jobs.push(t);
    },
    truncateTasks: function() {
      jober.jobs = [];
      return jober.jobs;
    },
    concatTasks: function(t) {
      if (Array.isArray(t)) {
        jober.jobs.concat(t);
        return jober.jobs;
      } else {
        return false;
      }
    },
    redefineTasks: function(t) {
      if (Array.isArray(t)) {
        jober.jobs = t;
        return jober.jobs;
      } else {
        return false;
      }
    }
  };

  extend(jober, opt);

  var secLast = 0; // For daily reset counters

  var intervalId = setInterval(function() {

    jober.beforeTick();

    var d = new Date();
    var secTick = d.getSeconds() + (60 * d.getMinutes()) + (60 * 60 * d.getHours());

    // Daily reset counters
    if (secLast > secTick) {
      jober.jobs.forEach(function(t) {
        t.donePerDay = 0;
      });
    }

    secLast = secTick;

    jober.jobs.forEach(function(t) {

      if (!t.donePerDay) t.donePerDay = 0;

      var intervalTick = 86400 / t.jobsPerDay;
      var jobTick = Math.floor(secTick / intervalTick) + 1;
      var secNext = intervalTick * t.donePerDay;

      if (t.donePerDay === 0 || (t.donePerDay < t.jobsPerDay && t.donePerDay < jobTick && secTick >= secNext)) {
        t.donePerDay = jobTick;
        if (typeof t.onTick === 'function') t.onTick(t);
        jober.onTick(t);
      }

    });

    jober.afterTick();

  }, jober.interval * 1000);

  return jober;
}
