class Router {
  constructor(options = {}) {
    this.root = options.root || '/';
    this.routes = options.routes || {
      '/': 'action'
    };

    // listen to url changes and call functions that match route
  }

  _getFragment() {
    const uri = decodeURI(location.pathname);

    return this.root !== '/' ? uri.replace(this.root, '') : uri;
  }

  _route() {
    const fragment = this._getFragment();

    this._execute(fragment);
  }

  _execute(fragment) {
    this[this.routes[fragment]]();
  }

  start() {
    this._route();

    window.onpopstate = this._route;
  }

  go(fragment) {
    window.history.pushState(null, null, `${this.root}/${fragment}`);
  }

  action() {
    console.log('action called');
  }
}
