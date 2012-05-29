module("View rendering tests");

test("GridRowView default rendering behavior", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 2, name: "Test Name"}]),
		testGridRowView = new GridRowView({
			model : testGrid.first(), 
			columns : testColumns
		}),
		expected = "<tr><td>2</td><td>Test Name</td></tr>";

	$('#qunit-fixture').html(testGridRowView.el);

	equal($('#qunit-fixture').html(), expected, "Expect correct row markup based on fixture data");
});

test("GridHeaderCellView default rendering behavior", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 2, name: "Test Name"}]),
		testGridHeaderCellView = new GridHeaderCellView({
			model : { name : "name", displayName : "Name" }
		}),
		expected = "<th>Name</th>";

	$('#qunit-fixture').html(testGridHeaderCellView.el);

	equal($('#qunit-fixture').html(), expected, "Expect correct header cell markup based on fixture data");
});

test("GridView default rendering behavior", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 2, name: "Test Name"}]),
		testGridView = new GridView({
			collection : testGrid,
			columns : testColumns
		}),
		expected = "<thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr><td>2</td><td>Test Name</td></tr></tbody>";

	$('#qunit-fixture').html(testGridView.el);

	equal($('#qunit-fixture').find('table').html(), expected, "Expect correct header markup based on fixture data");
});

test("Show/hide column menu default rendering behavior", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 2, name: "Test Name"}]),
		testGridView = new GridView({
			collection : testGrid,
			columns : testColumns
		}),
		expected = '<span><input type="checkbox" id="id-column-visible" checked="checked"><label for="id-column-visible">ID</label></span>';
		expected += '<span><input type="checkbox" id="name-column-visible" checked="checked"><label for="name-column-visible">Name</label></span>';

	$('#qunit-fixture').html(testGridView.el);

	equal($('#qunit-fixture').find('#show-hide-columns').html(), expected, "Expect correct markup for show/hide column menu");
});

test("Show/hide column menu is hidden by default", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 2, name: "Test Name"}]),
		testGridView = new GridView({
			collection : testGrid,
			columns : testColumns
		});

	$('#qunit-fixture').html(testGridView.el);

	ok($('#qunit-fixture').find('#show-hide-columns').is(':hidden'), "Expect the show/hide column menu to be hidden");
});

module("Functional tests");

test("Sorting the grid from the grid view by a string", function () {
	'use strict';

	var testColumns2 = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid2 = new Backbone.Collection([{ id: 1, name: "Test Name"},{ id: 2, name: "Another Test Name"}, { id: 3, name: "Still another Test Name"}]),
		testGridView = new GridView({
			collection : testGrid2,
			columns : testColumns2
		});

	testGridView.sort('name');

	equal(testGrid2.at(0).get('name'), "Another Test Name", "Expect first row to be have a name property that is alphabetically first");
	equal(testGrid2.at(2).get('name'), "Test Name", "Expect last row to be have a name property that is alphabetically last");

});

test("Sorting the grid from the grid view ascending and descending by a string", function () {
	'use strict';

	var testColumns2 = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid2 = new Backbone.Collection([{ id: 1, name: "Test Name"},{ id: 2, name: "Another Test Name"}, { id: 3, name: "Still another Test Name"}]),
		testGridView = new GridView({
			collection : testGrid2,
			columns : testColumns2
		});

	testGridView.sort('id');
	testGridView.sort('name', 'desc');

	equal(testGrid2.at(0).get('name'), "Test Name", "Expect first row to be have a name property that is alphabetically last");
	equal(testGrid2.at(2).get('name'), "Another Test Name", "Expect last row to be have a name property that is alphabetically first");

	testGridView.sort('id');
	testGridView.sort('name', 'asc');

	equal(testGrid2.at(0).get('name'), "Another Test Name", "Expect first row to be have a name property that is alphabetically first");
	equal(testGrid2.at(2).get('name'), "Test Name", "Expect last row to be have a name property that is alphabetically last");	

});

test("Sorting the grid from the column view by a string", function () {
	'use strict';

	var testColumns2 = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid2 = new Backbone.Collection([{ id: 1, name: "Test Name"},{ id: 2, name: "Another Test Name"}, { id: 3, name: "Still another Test Name"}]),
		testGridView = new GridView({
			collection : testGrid2,
			columns : testColumns2
		});

	$('#qunit-fixture').html(testGridView.el);

	testGridView.sort('id');

	$('#qunit-fixture').find('th').eq(1).click();

	equal(testGrid2.at(0).get('name'), "Another Test Name", "Expect first row to be have a name property that is alphabetically first");
	equal(testGrid2.at(2).get('name'), "Test Name", "Expect last row to be have a name property that is alphabetically last");
});

test("Sorting the grid from the column view ascending and descending by a string", function () {
	'use strict';

	var testColumns2 = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid2 = new Backbone.Collection([{ id: 1, name: "Test Name"},{ id: 2, name: "Another Test Name"}, { id: 3, name: "Still another Test Name"}]),
		testGridView = new GridView({
			collection : testGrid2,
			columns : testColumns2
		});

	$('#qunit-fixture').html(testGridView.el);

	testGridView.sort('id');
	
	$('#qunit-fixture').find('th').eq(1).click();

	equal(testGrid2.at(0).get('name'), "Another Test Name", "After clicking once, expect first row to be have a name property that is alphabetically first");
	equal(testGrid2.at(2).get('name'), "Test Name", "After clicking once, expect last row to be have a name property that is alphabetically last");

	$('#qunit-fixture').find('th').eq(1).click();

	equal(testGrid2.at(0).get('name'), "Test Name", "After clicking again, expect first row to be have a name property that is alphabetically last");
	equal(testGrid2.at(2).get('name'), "Another Test Name", "After clicking again, expect last row to be have a name property that is alphabetically first");
		
});

test("Sorting the grid from the column view ascending and descending by an integer", function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID" }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 1, name: "Test Name"},{ id: 2, name: "Another Test Name"}, { id: 3, name: "Still another Test Name"}]),
		testGridView;

	testGridView = new GridView({
		collection : testGrid,
		columns : testColumns
	});

	$('#qunit-fixture').html(testGridView.el);	
	$('#qunit-fixture').find('th').eq(0).click();

	equal(testGrid.at(0).get('id'), 1, "After clicking once, expect first row to be have a name property that is alphabetically first");
	equal(testGrid.at(2).get('id'), 3, "After clicking once, expect last row to be have a name property that is alphabetically last");

	$('#qunit-fixture').find('th').eq(0).click();

	equal(testGrid.at(0).get('id'), 3, "After clicking again, expect first row to be have a name property that is alphabetically last");
	equal(testGrid.at(2).get('id'), 1, "After clicking again, expect last row to be have a name property that is alphabetically first");
		
});

test('Render, but do not show columns that are designated "hidden"', function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID", hidden : true }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 1, name: "Test Name"}]),
		testGridView,
		expected;

	testGridView = new GridView({
		collection : testGrid,
		columns : testColumns
	});

	expected = '<thead><tr><th class="hidden">ID</th><th>Name</th></tr></thead><tbody><tr><td class="hidden">1</td><td>Test Name</td></tr></tbody>';

	$('#qunit-fixture').html(testGridView.el);

	equal($('#qunit-fixture').find('table').html(), expected, "Expect correct column to be hidden based on fixture data");
		
});

test('Test showColumnMenu and hideColumnMenu functions in GridView', function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID", hidden : true }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 1, name: "Test Name"}]),
		testGridView,
		expected;

	testGridView = new GridView({
		collection : testGrid,
		columns : testColumns
	});

	$('#qunit-fixture').html(testGridView.el);

	ok($('#qunit-fixture').find('#show-hide-columns').is(':hidden'), "Expect the show/hide column menu to be hidden initially");

	testGridView.showColumnMenu();

	ok($('#qunit-fixture').find('#show-hide-columns').is(':visible'), "Expect the show/hide column menu to be visible after calling showColumnMenu on the Grid View");

	testGridView.hideColumnMenu();

	ok($('#qunit-fixture').find('#show-hide-columns').is(':hidden'), "Expect the show/hide column menu to be hidden again after calling hideColumnMenu on the Grid View");
		
});

test('Right clicking header reaveals show hide column menu', function () {
	'use strict';

	var testColumns = [{ name : "id", displayName : "ID", hidden : true }, { name : "name", displayName : "Name" }],
		testGrid = new Backbone.Collection([{ id: 1, name: "Test Name"}]),
		testGridView,
		expected;

	testGridView = new GridView({
		collection : testGrid,
		columns : testColumns
	});

	$('#qunit-fixture').html(testGridView.el);

	ok($('#qunit-fixture').find('#show-hide-columns').is(':hidden'), "Expect the show/hide column menu to be hidden initially");

	$('#qunit-fixture').find('th').eq(0).trigger('contextmenu');

	ok($('#qunit-fixture').find('#show-hide-columns').is(':visible'), "Expect the show/hide column menu to be visible after right clicking a head cell");
		
});