window.GridRowView = Backbone.View.extend({

  tagName : 'tr',

  options : {
    columns : null,
    grid : null,
    modelName : 'statistics',
    columnID : 'attribute.id'
  },

  initialize : function () {
    'use strict';
    this.render();
  },

  render : function () {
    'use strict';
    if (this.options.columns) {
      _.each(this.options.columns, function (column) {
        var cell = '<td';
        if (column.hidden) {
          cell += ' class="hidden"'
        }
        cell += '>';

        // Find the object
        var obj = this.options.grid.getCell(this.model, column);
        var value = typeof(obj) === 'undefined' ? '' : obj[column.cellObjectProperty]

        cell += value + '</td>';

        $(this.el).append(cell);
      }, this);
    }
    return this;
  }
});