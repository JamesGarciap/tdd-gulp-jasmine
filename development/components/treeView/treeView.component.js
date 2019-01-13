const CLASS_REFERENCE = {
    "parent": "tree-view__parent",
    "parentOpen": "tree-view__parent--open",
    "parentClose": "tree-view__parent--close",
    "aligned": "tree-view__aligned",
    "child": "tree-view__child",
    "childVisible": "tree-view__child--visible"
  },
  EVENTS = {
    "toggle": "click"
  };

class TreeViewComponent {
  /**
   * Object constructor.
   * @param: {string} container - Provide information about the new tree DOM host
   * @param: {object} list - Contains the treeview source information
   * @param: {boolean} expandAll - Validate if the user wants to render the tree expanded
   */
  constructor(container, list, expandAll) {
    this._container = container;
    this._listObject = list;
    this._parentElements = [];
    this._listParents = [];
    this._defaultStatus = expandAll ? CLASS_REFERENCE.parentOpen : CLASS_REFERENCE.parentClose;
    this._defaultDisplay = expandAll ? CLASS_REFERENCE.childVisible : CLASS_REFERENCE.child;
  }
  /**
   * Function initializer. This method is called to start the render process for the treeview
   */
  init() {
    this._mainElement = document.querySelector(this._container);
    this._prepareList(this._listObject, this._mainElement);
  }
  /**
   * Start the DOM elements generation to contain the visual representation of the treeview.
   * @param: {object} container - DOM element to host list child list nodes
   * @param: {object} list - Contains the treeview source information
   */
  _prepareList(list = {}, container = null) {
    if (!list.label || !(container instanceof HTMLElement)) {
      return false;
    }

    let _li = document.createElement('li');

    _li.innerText = list.label;

    if (list.items && list.items.length) {
      let _ul = document.createElement('ul');

      _li = this._setParentListSettings(_li);
      _ul = this._setChildListSettings(_ul);
      _li.appendChild(_ul);
      this._printChildren(list, _ul);

    } else {
      _li.classList.add(CLASS_REFERENCE.aligned);
    }

    container.appendChild(_li);
  }
  /**
   * Apply recursion to the prepareList method in order to print the treeview levels recursively.
   * @param: {object} ul - DOM element to host list child list nodes
   * @param: {object} list - Contains the treeview source information
   */
  _printChildren(list, ul) {
    list.items.forEach((c) => {
      this._prepareList(c, ul);
    });
  }
  /**
   * Attach properties and events to a child list DOM element.
   * @param: {object} listParent - child list node
   * @return: {object} listParent - Return node with events and properties
   */
  _setChildListSettings(listParent) {
    listParent.addEventListener(EVENTS.toggle, (e) => {
      e.stopPropagation();
    });

    listParent.classList.add(this._defaultDisplay);
    this._listParents.push(listParent);

    return listParent;
  }
  /**
   * Attach properties and events to a parent list DOM element.
   * @param: {object} listElement - parent list node
   * @return: {object} listElement - Return node with events and properties
   */
  _setParentListSettings(listElement) {
    listElement.classList.add(CLASS_REFERENCE.parent);
    listElement.classList.add(this._defaultStatus);
    this._parentElements.push(listElement);

    listElement.addEventListener(EVENTS.toggle, (e) => {
      let _scope = e.target,
        _child = _scope.querySelector(':scope > ul');

      e.stopPropagation();
      _scope.classList.toggle(CLASS_REFERENCE.parentClose);
      _scope.classList.toggle(CLASS_REFERENCE.parentOpen);
      _child.classList.toggle(CLASS_REFERENCE.child);
    });

    return listElement;
  }
  /**
   * Return object attribute by name.
   * @param: {string} attribute - Name of the attribute to be returned
   */
  _returnAttribute(attribute) {
    return this['_' + attribute];
  }
}
