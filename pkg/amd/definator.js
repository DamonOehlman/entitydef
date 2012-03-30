define('definator', ['underscore'], function(underscore) {
  
  function definator(data, templateClass) {
      // initialise the temp constructor
      var tmpConstructor = function(opts) {
          opts = opts || {};
          
          for (var key in opts) {
              if (typeof this[key] == 'undefined') {
                  this[key] = opts[key];
              }
          }
          
          if (templateClass) {
              templateClass.call(this, opts);
          }
      };
      
      // initialise the prototype of the constructor
      tmpConstructor.prototype = underscore.extend({}, (templateClass || {}).prototype, data);
      
      // remove the state from the prototype
      delete tmpConstructor.prototype.state;
      
      // return the new constructor
      return tmpConstructor;
  }

  return definator;
});