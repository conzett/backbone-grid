GridEditableCellView = Backbone.View.extend({

  tagName : 'td',

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

      var form = '<input type="text" value="';
          form += this.model.get(this.options.cellObjectProperty) +'"/>'

      $(this.el).html(
        form
      ).find('input').focus();
    }
  },

  stopEditable : function () {
    this.model.save();
    $(this.el).removeClass('editing');
    this.options.editing = false;
    this.render();
  }

});