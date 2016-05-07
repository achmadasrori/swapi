var Router = {
	routes: [],
	root: '/',
	config: function(options) {
		this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
		return this;
	},
	getFragment: function() {
		var fragment = '';
		var match = window.location.href.match(/#(.*)$/);
		fragment = match ? match[1] : '';
		return this.clearSlashes(fragment);
	},
	clearSlashes: function(path) {
		return path.toString().replace(/\/$/, '').replace(/^\//, '');
	},
	add: function(re, handler) {
		if(typeof re == 'function') {
			handler = re;
			re = '';
		}
		this.routes.push({ re: re, handler: handler});
		return this;
	},
	remove: function(param) {
		for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
			if(r.handler === param || r.re.toString() === param.toString()) {
				this.routes.splice(i, 1); 
				return this;
			}
		}
		return this;
	},
	check: function(f) {
		var fragment = f || this.getFragment();
		for(var i=0; i<this.routes.length; i++) {
			var match = fragment.match(this.routes[i].re);
			if(match) {
				match.shift();
				this.routes[i].handler.apply({}, match);
				return this;
			}           
		}
		return this;
	},
	listen: function() {
		var self = this;
		var current = self.getFragment();
		var fn = function() {
			if(current !== self.getFragment()) {
				current = self.getFragment();
				self.check(current);
			}
		}
		clearInterval(this.interval);
		this.interval = setInterval(fn, 50);
		return this;
	},
	navigate: function(path) {
		path = path ? path : '';
		window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		return this;
	}
}