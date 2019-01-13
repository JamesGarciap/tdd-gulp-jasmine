/** This is an example of use for this component */
fetch('src/data/mocks.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let defaultTree = new TreeViewComponent('#tree-closed', data[0]);
    defaultTree.init();

    let openedTree = new TreeViewComponent('#tree-opened', data[1], true);
    openedTree.init();
  });
