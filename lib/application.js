import IndexRoute from 'adminjs/routes/index';
import IndexController from 'adminjs/controllers/index';
import IndexView from 'adminjs/views/index';
import SearchView from 'adminjs/views/search';

import ApplicationController from 'adminjs/controllers/application';
import ApplicationView from 'adminjs/views/application';

import group from 'adminjs/helpers/group';

import Config from 'adminjs/config';

Ember.ENV.HELPER_PARAM_LOOKUPS = true;

var Application = Ember.Application.extend({

  init: function() {
    this._super();
    this.configs = [];
    this.ApplicationController = ApplicationController;
    this.ApplicationView = ApplicationView;
  },

  manage: function(name, options) {

    options = Ember.merge({name: name}, options || {});

    var config = Config.create(options);

    this.configs.push(config);

    // build the controllers/views/routes for this resource
    this[config.classifiedPlural + 'IndexRoute'] = IndexRoute.extend({
      config: config
    });
    this[config.classifiedPlural + 'IndexController'] = IndexController.extend({
      config: config
    });
    this[config.classifiedPlural + 'IndexView'] = IndexView.extend({
      config: config
    });
    this[config.classifiedPlural + 'SearchView'] = SearchView.extend({
      config: config
    });
  },

  configure: function(dsl) {
    dsl.call(this);
    this.buildRoutes();
  },

  buildRoutes: function() {
    var app = this;
    this.Router.map(function() {
      app.configs.forEach(function(config) {
        this.resource(config.plural, function() {
          this.resource(config.name, {path: '/:' + config.name + '_id'}, function() {
            this.route('edit');
          });
        });
      }, this);
    });
  }

});

export default Application;