describe('TreeViewComponent', function() {
  var treeViewComponent,
      mockTree,
      attributes = {
        "container": "container",
        "mainClass": "tree-view",
        "parent": "tree-view__parent",
        "parentOpen": "tree-view__parent--open",
        "parentClose": "tree-view__parent--close",
        "child": "tree-view__child"
      };

  beforeEach(function() {
    mockTree = {
    	"label": "Node Label",
    	"items": [{
    		"label": "Child Node Label",
    		"items": [{
    			"label": "Child Node Label",
    			"items": [{
    				"label": "Child Node Label",
    				"items": []
    			}, {
    				"label": "Child Node Label"
    			}, {
    				"label": "Leaf Node Label"
    			}]
    		}]
    	}, {
    		"label": "2 Leaf Node Label"
    	}]
    };

    treeViewComponent = new TreeViewComponent('#' + attributes.container);
  });

  describe('Object instance :: Structural test', function() {
    it('Should initialize a new object', function() {
      expect(treeViewComponent).toBeDefined();
    });

    it('Should have a way to be initialized', function() {
      expect(treeViewComponent.init).toEqual(jasmine.any(Function));
    });

    it('Should have a way to prepare an dom objects to be rendered', function() {
      expect(treeViewComponent._prepareList).toEqual(jasmine.any(Function));
    });

    it('Should have a way to render tree view child elements recursively', function() {
      expect(treeViewComponent._printChildren).toEqual(jasmine.any(Function));
    });

    it('Should have a way to set DOM elements attributes to list parents', function() {
      expect(treeViewComponent._setChildListSettings).toEqual(jasmine.any(Function));
    });

    it('Should have a way to set DOM elements attributes to list elements', function() {
      expect(treeViewComponent._setParentListSettings).toEqual(jasmine.any(Function));
    });

    it('Should have a container attribute equal to initializer params', function() {
      expect(treeViewComponent._returnAttribute('container')).toEqual('#' + attributes.container);
    });
  });

  describe('DOM', function() {
    var container;

    beforeEach(function() {
      container = $('<ul id="' + attributes.container + '" class="' + attributes.mainClass + '">');
      $(document.body).append(container);
      el = $('#' + attributes.container);
      treeViewComponent._prepareList(mockTree, el[0]);
      el = $('#' + attributes.container);
    });

    it('Should exist a DOM element with the main class of the component', function() {
    	expect(el.hasClass(attributes.mainClass)).toBe(true);
    });

    it('Should print parents', function() {
    	expect(el.find('.' + attributes.parent).length).toBeGreaterThan(0);
    });

    it('Should print an equivalent number of parents according to the input object', function() {
    	expect(el.find('.' + attributes.parent).length).toEqual(treeViewComponent._returnAttribute('parentElements').length);
    });

    it('Should print an equivalent number of containers according to the input object', function() {
    	expect(el.find('.' + attributes.child).length).toEqual(treeViewComponent._returnAttribute('listParents').length);
    });

    it('Should be able to toggle a any parent state', function() {
      var randomParent = Math.floor(Math.random() * el.find('.' + attributes.child).length),
          parent = $($('.' + attributes.parent)[randomParent]);

    	expect(parent.hasClass(attributes.parentClose)).toBe(true);
      parent.click();
      expect(parent.hasClass(attributes.parentOpen)).toBe(true);
    });

    it('Should be able to add attributes to a list child element', function() {
    	var ul = document.createElement('ul');

      ul = $(treeViewComponent._setChildListSettings(ul));
      expect(ul.hasClass(attributes.child)).toBe(true);
    });

    it('Should be able to add attributes to a list parent element', function() {
    	var li = document.createElement('li');

      li = $(treeViewComponent._setParentListSettings(li));
      expect(li.hasClass(attributes.parent)).toBe(true);
      expect(li.hasClass(attributes.parentClose)).toBe(true);
    });

    afterEach(function() {
     container.remove();
     container = null;
    });
  });
});
