GridColumnMenuView = Backbone.View.extend({
    tagName : 'span',
    options : {
        grid : null
    },
    initialize : function () {
        'use strict';
        this.render();
    },
    render : function () {
        'use strict';
        var view = '<input type="checkbox" id="' + this.model.name + '-column-visible"';        
        if (!this.model.hidden) {
            view += ' checked="checked"';
        }
        view += '/><label for="'+ this.model.name +'-column-visible">'+ this.model.displayName +'</label>';
        $(this.el).append(view);
        return this;
    },
    events : {
        "change input" : "toggleChecked"
    },
    toggleChecked : function () {
        if (this.model.hidden) {
            this.options.grid.showColumn(this.model.name);
        } else {
            this.options.grid.hideColumn(this.model.name);
        }
    }
});