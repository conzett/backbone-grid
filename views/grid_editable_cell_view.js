GridEditableCellView = Backbone.View.extend({

  tagName : 'td',

  className : 'editable',

  options : {
    grid : null,
    cellObjectProperty : 'name',
    hidden : false,
    editing : false
  },

  events : {
    "click" : "makeEditable"
  },

  initialize : function () {
    'use strict';
    this.render();
    var that = this;
    $('html').bind('click', function(){
      if(that.options.editing){
        that.stopEditable();
      }
    });
  },

  render : function () {
    'use strict';

    $(this.el).html(this.model.get(this.options.cellObjectProperty));

    if (this.options.hidden) {
      $(this.el).addClass('hidden');
    }

    return this;
  },

  makeEditable : function (event) {

    event.stopImmediatePropagation(); // stop the 'stopEditable' from firing
    $('html').click(); // Hide other editing cells

    if(!this.options.editing){
      this.options.editing = true
      $(this.el).addClass('editing');

      var value = this.model.get(this.options.cellObjectProperty);
          value = value ? value : '';

      var form = '<input type="text" value="'+ value +'"/>'

      $(this.el).html(
        form
      ).find('input').focus();
    }
  },

  update : function () {
    var value = this.model.get('value') ? this.model.get('value').toString() : '',
        form = $(this.el).find('input').val(),
        that = this

    if (value !== form) {
      this.model.set('value', $(this.el).find('input').val());
      this.model.save({}, {
        success: function () {
          that.options.grid.eventAggregator.trigger(
            'grid:cellUpdated', this.model);
        },
        error: function (model, response) {
          console.log(model.toJSON());
          console.log(response);
        }
      });
    }
  },

  stopEditable : function () {
    this.update();
    $(this.el).removeClass('editing');
    this.options.editing = false;
    this.render();
  }

});