window.GridRowView = Backbone.View.extend({

    tagName : 'tr',

    options : {
        columns : null
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
                cell += '>' + this.model.get(column.name) + '</td>';
                $(this.el).append(cell);
            }, this);
        }
        return this;
    }
});