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
                $(this.el).append('<td>' + this.model.get(column.name) + '</td>');
            }, this);
        }
        return this;
    }
});