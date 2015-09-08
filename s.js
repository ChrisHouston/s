(function() {

	function select(id) {

		if (id instanceof HTMLElement) {
			return new Selector([id]);
		} else {
			var type = 0;
			var els = [];
			if (id.charAt(0) == "#") {
				type = 1;
				id = id.substr(1);
			} else if (id.charAt(0) == ".") {
				type=2;
				id = id.substr(1);
			}
			if (type == 1) {
				var el = document.getElementById(id);
				if (el) {
					els = [el];	
				}
			} else if (type == 2) {
				els = document.getElementsByClassName(id);
			} else {
				els = document.getElementsByTagName(id);
			}
			return new Selector(els);
		}
	}

	select.addClass = function(el, cls) {
		var ar = (el.className && el.className.length>0) ? el.className.split(" ") : [];
		if (ar.indexOf(cls) < 0) {
			ar.push(cls);
		}
		el.className = ar.join(" ");
	}
	
	select.removeClass = function(el, cls) {
		var ar = (el.className && el.className.length>0) ? el.className.split(" ") : [];
		var idx = ar.indexOf(cls);
		if (idx > -1) {
			ar.splice(idx,1);
		}
		el.className = ar.join(" ");
	}
	
	select.css = function(el, cssObj) {
		for (var n in cssObj) {
			el.style[n] = cssObj[n];	
		}
	}
	
	select.data = function(el, key, newValue) {
		try {
			return el.attributes["data-"+key].value;
		} catch (e) {
			return undefined;	
		}
		return undefined;
	}
	
	function Selector(els) {
		
		var me = this;
		
		for (var i = 0; i < els.length; i++) {
			this[i] = els[i];
		}
		
		this.length = els.length;

		this.addClass = function (cls) {
			for (var i = me.length - 1; i > -1; i--) {
				select.addClass(me[i], cls)
			}
			return me;
		}
		
		this.removeClass = function (cls) {
			for (var i = me.length - 1; i > -1; i--) {
				select.removeClass(me[i], cls);
			}
			return me;
		}

		this.hasClass = function (cls) {
			try {
				return (me[0].className.split(" ").indexOf(cls) > -1);
			} catch (e) {
				return false;
			}
			return false;
		}

		this.toggleClass = function (cls) {
			for (var i = me.length - 1; i > -1; i--) {
				if (me[i].className.indexOf(cls) > -1) {
					select.removeClass(me[i], cls);
				} else {
					select.addClass(me[i], cls);
				}
			}
			return me;
		}

		this.css = function (cssObj) {
			for (var i = me.length - 1; i > -1; i--) {
				select.css(me[i], cssObj);
			}
			return me;
		}

		this.data = function (key) {
			for (var i = me.length - 1; i > -1; i--) {
				var out = select.data(me[i], key);
				if (out != undefined) {
					return out;
				}
			}
			return undefined;
		}
	}

	window.s = window.s || select;

})();
