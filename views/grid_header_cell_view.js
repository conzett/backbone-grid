GridHeaderCellView = Backbone.View.extend({

    tagName : 'th',

    options : {
        grid : null,
        sortOrder : null,
        displayNameProperty : 'name'
    },

    initialize : function () {
        'use strict';
        this.render();
    },

    render : function () {
        'use strict';
        $(this.el).append(this.model[this.options.displayNameProperty]);
        if (this.model.hidden) {
            $(this.el).addClass('hidden');
        }
        return this;
    },

    events : {
        "click" : "sort",
        "contextmenu" : "showGridMenu"
    },

    sort : function () {
        'use strict';
        this.model.sortOrder = (this.model.sortOrder === 'asc') ? 'desc' : 'asc';
        this.options.grid.sort(this.model);
    },

    showGridMenu : function (event) {
        'use strict';
        event.preventDefault();
        this.options.grid.showColumnMenu();
    }
});