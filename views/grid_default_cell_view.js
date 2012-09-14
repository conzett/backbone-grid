GridDefaultCellView = Backbone.View.extend({

  tagName : 'td',

  options : {
    grid : null,
    cellObjectProperty : 'name',
    hidden : false
  },

  initialize : function () {
    'use strict';
    this.render();
  },

  render : function () {
    'use strict';

    $(this.el).append(this.model.get(this.options.cellObjectProperty));

    if (this.options.hidden) {
      $(this.el).addClass('hidden');
    }

    return this;
  }

});