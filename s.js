
(function() {

	function select(id, parent) {
		return select.find(id, parent);
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
		if (newValue != undefined) {
			return el.setAttribute("data-"+key, newValue);
		}
		try {
			return el.getAttribute("data-"+key);
		} catch (e) {
			return undefined;	
		}
		return undefined;
	}
	
	select.find = function(id, parent) {
		parent = parent || document;
		if (id instanceof HTMLElement) {
			return new Selector([id]);
		} else {
			var els = [];
			var char0 = id.charAt(0);
			var substr1 = id.substr(1);
			/* if first character is not alphabetical, . or # OR subsequent characters contain .#*,>+~]:) or space, use querySelectorAll */
			if (/[^\.#a-z]/.test(char0) || /[\.#\*,\s>\+~\]:\)]/.test(substr1)) {
				els = parent.querySelectorAll(id);
			} else {
				switch (char0) {
					case "#":
						var el = document.getElementById(substr1);
						if (el) {
							/* check that this element is in fact a child of the parent */
							var par = el.parentElement;
							while (par) {
								if (par == parent || parent == document) {
									els = [el];	
									break;
								}
								par = par.parentElement;
							}
						}
						break;
					case ".":
						els = parent.getElementsByClassName(id.substr(1));
						break;
					default:
						els = parent.getElementsByTagName(id);
				}
			}
			return new Selector(els);
		}
	}
	
	select.listen = function (el, eventName, handler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler, false);
		} else if (el.attachEvent && htmlEvents['on' + eventName]) { // IE < 9
			el.attachEvent('on' + eventName, handler);
		} else {
			el['on' + eventName] = handler;
		}
	}

	select.stopListening = function (el, eventName, handler) {
		if (el.removeventListener) {
			el.removeEventListener(eventName, handler, false);
		} else if (el.detachEvent && htmlEvents['on' + eventName]) { // IE < 9
			el.detachEvent('on' + eventName, handler);
		} else {
			el['on' + eventName] = null;
		}
	}
	
	select.dispatch = function(el, eventName) {
		var event;
		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(eventName, true, true);
		} else if (document.createEventObject) { // IE < 9
			event = document.createEventObject();
			event.eventType = eventName;
		}
		event.eventName = eventName;
		if (el.dispatchEvent) {
			el.dispatchEvent(event);
		} else if (el.fireEvent && htmlEvents['on' + eventName]) { // IE < 9
			el.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
		} else if (el[eventName]) {
			el[eventName]();
		} else if (el['on' + eventName]) {
			el['on' + eventName]();
		}
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

		this.data = function (key, value) {
			/* returns first non-undefined value when getting, but sets all values when setting. */
			var out, val;
			for (var i = me.length - 1; i > -1; i--) {
				val = select.data(me[i], key, value);
				if (val != undefined) {
					out = val;
				}
			}
			return out;
		}
		
		this.find = function(id) {
			var els = [];
			for (var i = 0; i <me.length; i++) {
				var sel = select.find(id, me[i]);
				for (var j=0;j<sel.length;j++) {
					els.push(sel[j]);
				}
			}
			return new Selector(els);
		}
		
		this.listen = function(eventName, handler) {
			for (var i = me.length - 1; i > -1; i--) {
				select.listen(me[i], eventName, handler);
			}
			return me;
		}
		
		this.stopListening = function(eventName, handler) {
			for (var i = me.length - 1; i > -1; i--) {
				select.stopListening(me[i], eventName, handler);
			}
			return me;
		}
				
		this.dispatch = function(eventName) {
			for (var i = me.length - 1; i > -1; i--) {
				select.dispatch(me[i], eventName);
			}
			return me;
		}
		
	}

	window.s = window.s || select;

})();
