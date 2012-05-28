GridView = Backbone.View.extend({
    tagName : 'table',
    options : {
        columns : null
    },
    initialize : function () {
        'use strict';
        this.render();
    },
    render : function () {
        'use strict';
        $(this.el).html('<thead><tr></tr></thead><tbody></tbody>');
        this.addHeader();
        this.addRows();
        return this;
    },
    addHeader : function () {
        'use strict';
        _.each(this.options.columns, function (header) {
            var view = new GridHeaderCellView({
                model : header,
                grid : this
            });
            $('thead tr', this.el).append(view.el);
        }, this);
    },
    addRow : function (row) {
        'use strict';
        var view = new GridRowView({
            model : row,
            columns : this.options.columns
        });
        $('tbody', this.el).append(view.el);
    },
    addRows : function () {
        'use strict';
        this.collection.each(this.addRow, this);
    },
    sort : function (criteria, order) {
        'use strict';
        this.collection.comparator = function (column) {
            if (order === 'desc') {
                return String.fromCharCode.apply(
                    String,
                    _.map(column.get(criteria).toString().split(""), function (c) {
                        return 0xffff - c.charCodeAt();
                    })
                );
            }
            return column.get(criteria);
        };
        this.collection.sort();
        this.render();
    }
});