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

        var view = new column.cellView({
          model : new column.cellModel(
            this.options.grid.getCell(this.model, column),
            // row and column are passed as options to cell model
            {
              row : this.model,
              column : column
            }
          ),
          grid : this.options.grid,
          cellObjectProperty : column.cellObjectProperty,
          hidden : column.hidden
        });

        $(this.el).append(view.el);

      }, this);
    }
    return this;
  }
});