/*
===============================================================================================

		Unify Project

		Homepage: unify-project.org
		License: MIT + Apache (V2)
		Copyright: 2012, Sebastian Fastner, Mainz, Germany, http://unify-training.com

===============================================================================================
*/

/**
 * Global activity indicator manager managing multiple activities on one indicator
 */
core.Class("unify.ui.manager.ActivityIndicatorManager", {
	include: [unify.core.Object],
	
	construct : function() {
		unify.core.Object.call(this);
		
		this.__activeMap = {};
		this.__activeIds = [];
	},
	
	members : {
		__activityIndicator : null,
		__activeMap : null,
		__activeIds : null,
		
		_getActivityIndicator : function() {
			var ai = this.__activityIndicator;
			if (ai) {
				return ai;
			}
			
			ai = this.__activityIndicator  = new unify.ui.other.ActivityIndicator();
			
			return ai;
		},
		
		isShown : function(id) {
			if (!id) id = "undef";
			var am = this.__activeMap;
			
			return !!am[id];
		},
		
		/**
		 * Shows an activity indicator for activity @id {String}.
		 */
		show : function(id) {
			if (!id) id = "undef";
			var am = this.__activeMap;
			if (!am[id]) {
				this.__activeIds.push(id);
				am[id] = 0;
				var overlay = this._getActivityIndicator();
				unify.ui.core.PopOverManager.getInstance().show(overlay, "center");
			}
			am[id]++;
		},
		
		/**
		 * Hides activity indicator of activity @id {String}.
		 */
		hide : function(id) {
			if (!id) id = "undef";
			var am = this.__activeMap;
			if (jasy.Env.getValue("debug")) {
				if (!am[id]) {
					console.error("Activity indicator " + id + " is not shown!");
					return;
				}
			}
			am[id]--;
			// TODO !!
			if (true || am[id] == 0) {
				core.Array.remove(this.__activeIds, id);
			}
			
			if (this.__activeIds.length <= 0) {
				var overlay = this._getActivityIndicator();
				unify.ui.core.PopOverManager.getInstance().hide(overlay);
			}
		}
	}
});

unify.core.Singleton.annotate(unify.ui.manager.ActivityIndicatorManager);
