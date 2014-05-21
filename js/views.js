Ember.Handlebars.helper('format-date',function(date) {
  if (date == '') return '.';
  return moment(date).lang('es').format('LL');
})

Ember.Handlebars.helper('truncate',function(string) {
  var maxLength = 200;
  if (string.length > maxLength){
    var trimmedString = string.substr(0, maxLength);
    var resultString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return resultString + "...";
  }
  else {
    return string;
  }
});

App.EditWordView = Ember.View.extend({
  didInsertElement: function(){
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-word', App.EditWordView);

App.CalendarDatePicker = Ember.TextField.extend({
  _picker: null,
 
  modelChangedValue: function(){
    var picker = this.get("_picker");
    if (picker){
      picker.setDate(this.get("value"));
    }
  }.observes("value"),
 
  didInsertElement: function(){
    var currentYear = (new Date()).getFullYear();
    var formElement = this.$()[0];
    var picker = new Pikaday({
      field: formElement,
      //format: "DD-MM-YYYY",
      yearRange: [1900, currentYear + 2]
    });
    this.set("_picker", picker);
  },
 
  willDestroyElement: function(){
    picker = this.get("_picker");
    if (picker) {
      picker.destroy();
    }
    this.set("_picker", null);
  }
});
