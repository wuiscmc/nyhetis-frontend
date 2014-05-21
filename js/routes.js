Ember.FEATURES["query-params"] = true;

App.Router.map(function() {
  this.resource('news',{ path: '/', queryParams: ['from', 'to'] });
  this.resource('words');
});


App.NewsRoute = Ember.Route.extend({
  model: function( params,queryParams,transition ) {
    var data = {};
    if(queryParams.from && queryParams.to){
      data = {fromts: queryParams.from, tots: queryParams.to};
    }
    return Ember.$.getJSON(Config.url('/news'), data).then(function(json){
      return json['news'].reverse();
    });
  }
})  

App.WordsRoute = Ember.Route.extend({
  setupController: function(controller, model){
    Ember.$.getJSON(Config.url('/status')).then(function(data){
      controller.set('status', data.response);
    });
    controller.set('model', model);
  },
  model: function(){
    return this.store.find('word');
  }
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model){
    var sessionId = controller.get('session').sessionId();
    controller.set('sessionId', sessionId);
    controller.set('model', model);
  },
  actions:{
    error: function(reason, error){
      if (reason.status === 403){
        alert('Unauthorized action');
        this.controllerFor('application').transitionToRoute('/');  
      }
    }
  }
})


