var extend = require('util')._extend;

module.exports.init = function(opt) {

  var jober = {

    interval: 60, // in seconds
    jobs: [],

    beforeTick: function() {},
    onTick: function() {},
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

  var intervalId = setInterval(function() {

    jober.beforeTick();

    var d = new Date();
    var secTick = d.getSeconds() + (60 * d.getMinutes()) + (60 * 60 * d.getHours());

    jober.jobs.forEach(function(t) {

      if (!t.donePerDay) t.donePerDay = 0;

      var intervalTick = 86400 / t.jobsPerDay;
      var jobTick = Math.floor(secTick / intervalTick);
      var secNext = intervalTick * t.donePerDay;

      if (t.donePerDay === 0 || (t.donePerDay < t.jobsPerDay && t.donePerDay < jobTick && secTick >= secNext)) {
        t.onTick();
        jober.onTick();
        t.donePerDay = jobTick;
      }

    });

    jober.afterTick();

  }, jober.interval * 1000);

  return jober;
}
