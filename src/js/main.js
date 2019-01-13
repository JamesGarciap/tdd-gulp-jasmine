'use strict';

/** This is an example of use for this component */
fetch('src/data/mocks.json').then(function (response) {
  return response.json();
}).then(function (data) {
  var defaultTree = new TreeViewComponent('#tree-closed', data[0]);
  defaultTree.init();

  var openedTree = new TreeViewComponent('#tree-opened', data[1], true);
  openedTree.init();
});