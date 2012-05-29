GridHeaderCellView = Backbone.View.extend({
    tagName : 'th',
    options : {
        grid : null,
        order : null
    },
    initialize : function () {
        'use strict';
        this.render();
    },
    render : function () {
        'use strict';
        $(this.el).append(this.model.displayName);
        if (this.model.hidden) {
            $(this.el).addClass('hidden');
        }
        return this;
    },
    events : {
        "click" : "sort"
    },
    sort : function () {
        'use strict';
        this.model.order = (this.model.order === 'asc') ? 'desc' : 'asc';
        this.options.grid.sort(this.model.name, this.model.order);
    }
});