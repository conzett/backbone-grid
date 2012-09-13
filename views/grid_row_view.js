window.GridRowView = Backbone.View.extend({

    tagName : 'tr',

    options : {
        columns : null,
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

               var value = column.valueFunction.apply(this, [this.model, column]);

                cell += value + '</td>';

                $(this.el).append(cell);
            }, this);
        }
        return this;
    }
});