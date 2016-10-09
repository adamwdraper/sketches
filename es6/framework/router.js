class Router {
  constructor(options = {}) {
    this._regExp = {
      default: /^[*]$/,
      regExp: /^\/.+\/$/,
      slashes: /(^\/)|(\/$)/g,
      optional: /\((.*?)\)/g,
      named: /(\(\?)?:\w+/g,
      splat: /\*\w+/g,
      escape: /[\-{}\[\]+?.,\\\^$|#\s]/g
    };
    this._routes = [];

    this.root = options.root || '/';
    this.routes = options.routes || {
      '*': 'action'
    };

    this._processRoutes();

    this.setup();
  }

  _processRoutes() {
    for (let route in this.routes) {
      this._routes.push({
        route,
        regExp: this._regExp.regExp.test(route) ? new RegExp(this._trimSlashes(route)) : this._routeToRegExp(route),
        callback: this[this.routes[route]]
      });
    }
  }

  _trimSlashes(string) {
    return string.replace(this._regExp.slashes, '');
  }

  _routeToRegExp(route) {
    let regExp;

    if (route === '*') {
      regExp = this._regExp.default;
    } else {
      route = route.replace(this._regExp.escape, '\\$&')
        .replace(this._regExp.optional, '(?:$1)?')
        .replace(this._regExp.named, function(match, optional) {
         return optional ? match : '([^/?]+)';
        })
        .replace(this._regExp.splat, '([^?]*?)');

      regExp = new RegExp(`^${route}$`);
    }

    return regExp;
  }

  _getFragment() {
    const uri = decodeURI(location.pathname);

    return this.root !== '/' ? uri.replace(this.root, '') : uri;
  }

  _createPath(fragment) {
    let path = [];

    if (this.root !== '/') {
      path.push(this._trimSlashes(this.root));
    }

    if (fragment && fragment !== '/') {
      path.push(this._trimSlashes(fragment));
    }

    return `/${path.join('/')}`;
  }

  _route() {
    const fragment = this._getFragment();

    this._execute(fragment);
  }

  _execute(fragment) {
    let callback;

    for (let route of this._routes) {
      if (route.regExp.test(fragment) || route.route === '*') {
        callback = route.callback;

        break;
      }
    }

    if (callback) {
      callback();
    } else {
      throw new Error(`No route found for ${fragment}`);
    }
  }

  setup() {

  }

  start() {
    this._route();

    window.onpopstate = () => {
      this._route();
    };
  }

  go(fragment) {
    const path = this._createPath(fragment);

    window.history.pushState({}, '', path);

    this._route();
  }

  action() {
    console.log('action called');
  }
}
