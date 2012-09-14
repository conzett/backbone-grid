GridView = Backbone.View.extend({

  tagName : 'div',
  options : {
    columns : null,
    columnMenu : false,
    displayPropertyName : 'name'
  },

  initialize : function () {
    'use strict';

    var columnDefaults = {
      cellObjectFunction : function(row, column){ return row },
      cellObjectProperty : 'id'
    }

    // Merge in default column options
    this.options.columns = _.map(this.options.columns, function(column){
      return $.extend({}, columnDefaults, column);
    }, this);

    this.render();

    var that = this;

    $(document).mousedown(function (event) {
      if ($("#show-hide-columns").has(event.target).length === 0) {
        that.hideColumnMenu();
      }
    });
  },

  render : function () {
    'use strict';
    $(this.el).html('<table><thead><tr></tr></thead><tbody></tbody></table><div id="show-hide-columns"></div>');
    this.renderHeader();
    this.renderRows();
    if(!this.options.columnMenu) {
      $('#show-hide-columns', this.el).css('display', 'none');
    };
    return this;
  },

  renderHeader : function () {
    'use strict';

    _.each(this.options.columns, function (header) {

      var view = new GridHeaderCellView({
        model : header,
        grid : this,
        displayNameProperty : this.options.displayPropertyName
      });

      $('thead tr', this.el).append(view.el);
      var menu = new GridColumnMenuView({
        model : header,
        grid : this
      });

      $('#show-hide-columns', this.el).append(menu.el);
    }, this);
  },

  renderRows : function () {
    'use strict';
    this.collection.each(this.renderRow, this);
  },

  renderRow : function (row) {
    'use strict';

    var view = new GridRowView({
      model : row,
      columns : this.options.columns
    });

    $('tbody', this.el).append(view.el);
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
    _.each(this.options.columns, function (header, index) {
      if (header.name === column_name) {
        header.hidden = false;
        $('tr :nth-child(' + (index + 1) + ')').removeClass('hidden');
      }
    }, this);
    this.render();
  },

  hideColumn : function (column_name) {
    _.each(this.options.columns, function (header, index) {
      if (header.name === column_name) {
        header.hidden = true;
        $('tr :nth-child(' + (index + 1) + ')').addClass('hidden');
      }
    }, this);
  },

  filterColumn : function (column_name, comparison) {
    var test = this.collection.filter(function (column) {
      return comparison.call(this, column.get(column_name));
    });
    this.collection = new Backbone.Collection(test);
    this.render();
  }
});