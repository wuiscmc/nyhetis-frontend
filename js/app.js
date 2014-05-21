Ember.LOG_VERSION = false;
Ember.FEATURES["query-params"] = true;

App = Ember.Application.create({
  ready: function(){
    this.register('session:current', App.Session, {singleton: true});
    this.inject('controller', 'session', 'session:current');
  }
});

DS.RESTAdapter.reopen({
  host: Config.root
}); 

App.ApplicationAdapter = DS.RESTAdapter.extend();
