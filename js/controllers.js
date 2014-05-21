App.ApplicationController = Ember.Controller.extend({

  expandedLoginForm: false,
  expandedFilterForm: false,
  email: '',
  password: '',
  errorMessage: '',
  from: '',
  to: '',
  loginFormId: 'login-form',

  currentUser: function(){
    var session = this.get('session'); 
    if (session.loggedIn()){
      this.set('expandedLoginForm', false);
      return this.get('session').user();
    }
    return false;
  }.property('sessionId'),

  expLogin: function(){
    $('#'+this.get('loginFormId')).toggle('medium');
    this.setProperties({
      email: '',
      password: '',
      errorMessage: ''
    });
  }.observes('expandedLoginForm'),

  actions:{
    loginForm: function(form){
      this.set('expandedLoginForm', !this.get('expandedLoginForm'));
    },

    toggleFilterForm: function(form){
      this.set('expandedFilterForm', !this.get('expandedFilterForm'));
      $(form).toggle('medium');
      this.setProperties({
        from: '',
        to: ''
      });
      if(!this.get('expandedFilterForm')){
        this.transitionToRoute('/');
      }
    },

    filter: function(){
      if (this.get('from') && this.get('to') && moment(this.get('from')).isBefore(this.get('to'))){
        this.transitionToRoute({queryParams: { from:this.get('from'), to: this.get('to') } });
      }
    },

    login: function(){
      var self = this;
      var data = this.getProperties('email', 'password');
      self.set('errorMessage', null);
      Ember.$.post(Config.url("/session"),{user: data['email'], password: data['password']}).then(function(response){
          self.set('sessionId', response.session);
          self.set('currentUserEmail', data['email']);
          self.get('session').setSession(data['email'], response.session);
      }).fail(function(response){
          alert('Invalid user or password');
      });
    },

    logout: function(){
      this.set('sessionId', null);
      this.set('currentUserEmail', null);
      this.get('session').setSession(null, null);
      this.transitionToRoute('/');
    },


  }
});

