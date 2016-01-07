Project = new Mongo.Collection('project');
Bug = new Mongo.Collection('bug');
Task = new Mongo.Collection('task');
Module = new Mongo.Collection('module');
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});
