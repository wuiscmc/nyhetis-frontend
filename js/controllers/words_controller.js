App.WordsController = Ember.ArrayController.extend({
  needs: "application",
  displayForm: false,
  status: 'ACTIVE',

  total: function(){
    return this.get('length');
  }.property('@each'),

  isActive: function(){
    return this.get('status') === 'ACTIVE';
  }.property('status'),

  inflection: function(){
    var total = this.get('total');
    return total === 1 ? 'word' : 'words';
  }.property('total'),

  actions: {
    toggleForm: function() {
      this.set('displayForm', !this.get('displayForm'));
    },
    addWord: function () {
      var text = this.get('newWord');
      if (!text.trim()) { return; }
      var word = this.store.createRecord('word', {
        text: text,
      });
      word.commitCreate();
      this.set('newWord', '');
    },
    scheduleSearchJob: function(){
      var self = this;
      Ember.$.get(Config.url('/search')).then(function(response){
        if(response.response){
          self.set('status', 'ACTIVE');
        }
        else{
          self.set('status', 'INACTIVE');
        }
      });
    }
  }
});

App.WordController = Ember.ObjectController.extend({

  isEditing: false, 
  actions: {
    editWord: function(){
      this.set('isEditing', !this.get('isEditing'));
    },

    acceptChanges: function () {
         this.set('isEditing', false);

         if (Ember.isEmpty(this.get('model.text'))) {
            this.send('removeWord');
         }
         else {
            var word = this.get('model');
            word.save();
         }
    },

    removeWord: function () {
      var word = this.get('model');
      word.deleteRecord();
      word.commitDelete();
    },
  }
});