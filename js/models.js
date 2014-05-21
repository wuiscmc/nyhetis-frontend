App.Word = DS.Model.extend({
  
  text: DS.attr('string'),

  commitCreate: function(){
    $.ajax({
      type: 'PUT',
      url: Config.url('/words'),
      data: {'word': this.get('text')}
    });
  },

  commitDelete: function(){
    $.ajax({
      type: 'DELETE',
      url: Config.url('/words'),
      data: {word: this.get('text')}
    });
  }

});

App.WordSerializer = DS.RESTSerializer.extend({
  normalize: function(type, hash, property) {
    hash.id = hash.text;
    return this._super(type, hash, property);
  }
});


App.Session = Ember.Object.extend({

  loggedIn: function(){
    return !!this.sessionId() && this.sessionId() != "null";
  },
  user: function(){
    return $.cookie('currentUserEmail');
  },
  sessionId: function(){
    return $.cookie('sessionId');
  },
  setSession: function(user, sessionId){
    $.cookie('sessionId', sessionId);
    $.cookie('currentUserEmail', user);
  },
});

Ember.$.ajaxPrefilter(function(options,originalOptions,jqXHR){
  if (!jqXHR.crossDomain) {
    jqXHR.setRequestHeader('Auth-User', $.cookie('currentUserEmail'));
    jqXHR.setRequestHeader('Session-Id', $.cookie('sessionId'));
  }
});