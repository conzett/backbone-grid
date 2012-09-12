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

                console.log(_.reduce('options.columnID'.split('.'), function(obj,i) {return obj[i]}, this));

                var stat = _.find(this.model.get(this.options.modelName), function(obj){ return obj['attribute']['id'] == column.id; });
                var value = stat ? stat.value : '';
                cell += value + '</td>';

                $(this.el).append(cell);
            }, this);
        }
        return this;
    }
});