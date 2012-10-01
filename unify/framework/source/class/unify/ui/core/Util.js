(function(){

	var positionStore = {};
  var viewportRoot = null;
	
	core.Module("unify.ui.core.Util", {
		getWidgetLocation : function(widget) {
      if (!viewportRoot) {
        viewportRoot = unify.core.Init.getApplication().getRoot().getViewportElement();
      }
      
			return lowland.bom.Element.getLocation(widget.getElement(), viewportRoot);
		},
		
		domElementToRootLevel : function(widget) {
			var hash = widget.getHash();
			var posOverride = positionStore[hash];
			
			var e = widget.getElement();
			
			if (!posOverride) {
				var pos = unify.ui.core.Util.getWidgetLocation(widget);
				var origPos = widget.getPosition();
	
				posOverride = positionStore[hash] = {
					originalPosition : {
						left: origPos[0],
						top: origPos[1],
						zIndex: lowland.bom.Style.get(e, "zIndex")
					},
					newPosition : {
						left: pos.left,
						top: pos.top,
						zIndex: 20000
					}
				};
			}
			
			var rootElement = unify.core.Init.getApplication().getRoot().getElement();
			
			if (rootElement === e.parentNode) {
				// Element is in root, so nothing to do
				return;
			}
			
			widget.setUserData("domElementPositionOverride", {left: posOverride.newPosition.left, top: posOverride.newPosition.top});
			
			lowland.bom.Style.set(e, {
				left: posOverride.newPosition.left + "px",
				top:  posOverride.newPosition.top + "px",
				zIndex: 20000
			});
			
			rootElement.appendChild(e);
		},
		
		domElementToTreeLevel : function(widget) {
			var hash = widget.getHash();
			var e = widget.getElement();
			
			var posOverride = positionStore[hash];
			
			if (!posOverride) {
				return;
			}
			
			var parentElement = widget.getParentBox().getContentElement();
			if (e.parentNode == parentElement) {
				// Element is in tree, so nothing to do
				return;
			}
			
			var origPos = posOverride.originalPosition;
			
			lowland.bom.Style.set(e, {
				left: origPos.left + "px",
				top: origPos.top + "px",
				zIndex: origPos.zIndex
			});
			parentElement.appendChild(e);
			
			widget.setUserData("domElementPositionOverride", null);
		}
	});


})();