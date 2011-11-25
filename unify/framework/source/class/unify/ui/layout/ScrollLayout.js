/* ***********************************************************************************************

    Unify Project

    Homepage: unify-project.org
    License: MIT + Apache (V2)
    Copyright: 2011, Sebastian Fastner, Mainz, Germany, http://unify-training.com

*********************************************************************************************** */

/**
 * EXPERIMENTAL
 */
qx.Class.define("unify.ui.layout.ScrollLayout", {
  extend : qx.ui.layout.Abstract,
  
  members : {
    __content : null,
    __indicatorX : null,
    __indicatorY : null,
    
    renderLayout : function(availWidth, availHeight) {
      if (this._invalidChildrenCache) {
        this.__rebuildCache();
      }
      
      var indicatorX = this.__indicatorX;
      var indicatorXSize = indicatorX.getSizeHint();
      var indicatorXProp = this.__indicatorXProp;
      indicatorX.renderLayout(0, availHeight-indicatorXSize.height,
                              availWidth-indicatorXProp.distance,indicatorXSize.height);
      
      var indicatorY = this.__indicatorY;
      var indicatorYSize = indicatorY.getSizeHint();
      var indicatorYProp = this.__indicatorYProp;
      indicatorY.renderLayout(availWidth-indicatorYSize.width, 0,
                              indicatorYSize.width, availHeight-indicatorYProp.distance);
      
      var content = this.__content;
      var contentSizeHint = content.getSizeHint();
      
      var widget = this._getWidget();
      var enableScrollX = widget.getEnableScrollX();
      var enableScrollY = widget.getEnableScrollY();
      if (enableScrollX && enableScrollY) {
        content.renderLayout(0, 0, contentSizeHint.width, contentSizeHint.height);
      } else if (enableScrollX) {
        content.renderLayout(0, 0, contentSizeHint.width, availHeight);
      } else if (enableScrollY) {
        content.renderLayout(0, 0, availWidth, contentSizeHint.height);
      }
    },
    
    __rebuildCache : function() {
      var widgets = this._getLayoutChildren();
      
      for (var i=0,ii=widgets.length; i<ii; i++) {
        var child = widgets[i];
        
        var childProp = child.getLayoutProperties();
        var type = childProp.type;
        
        if (type == "content") {
          this.__content = child;
          this.__contentProp = childProp;
        } else if (type == "indicatorX") {
          this.__indicatorX = child;
          this.__indicatorXProp = childProp;
        } else if (type == "indicatorY") {
          this.__indicatorY = child;
          this.__indicatorYProp = childProp;
        } else {
          throw "Unknown type " + type;
        }
      }
    }
  }
});