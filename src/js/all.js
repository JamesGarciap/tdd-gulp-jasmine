"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASS_REFERENCE = {
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

var TreeViewComponent = function () {
  /**
   * Object constructor.
   * @param: {string} container - Provide information about the new tree DOM host
   * @param: {object} list - Contains the treeview source information
   * @param: {boolean} expandAll - Validate if the user wants to render the tree expanded
   */
  function TreeViewComponent(container, list, expandAll) {
    _classCallCheck(this, TreeViewComponent);

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


  _createClass(TreeViewComponent, [{
    key: "init",
    value: function init() {
      this._mainElement = document.querySelector(this._container);
      this._prepareList(this._listObject, this._mainElement);
    }
    /**
     * Start the DOM elements generation to contain the visual representation of the treeview.
     * @param: {object} container - DOM element to host list child list nodes
     * @param: {object} list - Contains the treeview source information
     */

  }, {
    key: "_prepareList",
    value: function _prepareList() {
      var list = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var container = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (!list.label || !(container instanceof HTMLElement)) {
        return false;
      }

      var _li = document.createElement('li');

      _li.innerText = list.label;

      if (list.items && list.items.length) {
        var _ul = document.createElement('ul');

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

  }, {
    key: "_printChildren",
    value: function _printChildren(list, ul) {
      var _this = this;

      list.items.forEach(function (c) {
        _this._prepareList(c, ul);
      });
    }
    /**
     * Attach properties and events to a child list DOM element.
     * @param: {object} listParent - child list node
     * @return: {object} listParent - Return node with events and properties
     */

  }, {
    key: "_setChildListSettings",
    value: function _setChildListSettings(listParent) {
      listParent.addEventListener(EVENTS.toggle, function (e) {
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

  }, {
    key: "_setParentListSettings",
    value: function _setParentListSettings(listElement) {
      listElement.classList.add(CLASS_REFERENCE.parent);
      listElement.classList.add(this._defaultStatus);
      this._parentElements.push(listElement);

      listElement.addEventListener(EVENTS.toggle, function (e) {
        var _scope = e.target,
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

  }, {
    key: "_returnAttribute",
    value: function _returnAttribute(attribute) {
      return this['_' + attribute];
    }
  }]);

  return TreeViewComponent;
}();
