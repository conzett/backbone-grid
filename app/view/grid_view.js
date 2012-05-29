GridView = Backbone.View.extend({
    tagName : 'div',
    options : {
        columns : null,
        columnMenu : false
    },
    initialize : function () {
        'use strict';
        this.render();
    },
    render : function () {
        'use strict';
        $(this.el).html('<table><thead><tr></tr></thead><tbody></tbody></table><div id="show-hide-columns"></div>');

        if(!this.options.columnMenu) {
            $('#show-hide-columns', this.el).css('display', 'none');
        }
        
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
            var menu = new GridColumnMenuView({
                model : header,
                grid : this
            });
            $('#show-hide-columns', this.el).append(menu.el);
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
    sort : function (criteria, sortOrder) {
        'use strict';
        this.collection.comparator = function (column) {
            if (sortOrder === 'desc') {
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
    },
    showColumnMenu : function () {
        $('#show-hide-columns', this.el).show();
        this.options.columnMenu = true;
    },
    hideColumnMenu : function () {
        $('#show-hide-columns', this.el).hide();
        this.options.columnMenu = false;
    },
    showColumn : function (column_name) {
        _.each(this.options.columns, function (header) {
            if (header.name === column_name) {
                header.hidden = false;
            }
        }, this);
        this.render();
    },
    hideColumn : function (column_name) {
        _.each(this.options.columns, function (header) {
            if (header.name === column_name) {
                header.hidden = true;
            }
        });
        this.render();
    }
});