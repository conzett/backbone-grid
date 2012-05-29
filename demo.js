var pictures = new Backbone.Collection([
    { id: 2, name: "My dog", filename: "IMG_0392.jpg" },
    { id: 3, name: "Our house", filename: "IMG_0393.jpg" },
    { id: 4, name: "My favorite food", filename: "IMG_0394.jpg" },
    { id: 5, name: "His bag", filename: "IMG_0394.jpg" }
    ]);

var columns = [
            { name : "id", displayName : "ID", hidden : false },
            { name : "name", displayName : "Name" },
            { name : "filename", displayName : "File Name" }
        ];

var grid_view_small = new GridView({
	collection : pictures,
    columns : columns
});

/*

var grid_view_large = new GridView({
    collection : fake_data,
    columns : fake_data_columns
}); */

$('body').append(grid_view_small.el);